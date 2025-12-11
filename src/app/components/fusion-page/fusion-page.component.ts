import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { forkJoin } from 'rxjs'; // AÑADE ESTA IMPORTACIÓN
import { FusionCardComponent } from '../fusion-card/fusion-card.component';


import { PokemonService, Pokemon, FusionPokemon } from '../../services/pokemon.service';

@Component({
  selector: 'app-fusion-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FusionCardComponent
  ],
  templateUrl: './fusion-page.component.html',
  styleUrls: ['./fusion-page.component.scss']
})
export class FusionPageComponent implements OnInit {
  pokemons: Pokemon[] = [];
  fusionResult: FusionPokemon | null = null;
  loading = false;

  constructor(private pokemonService: PokemonService) { }

  // Agrega este método a la clase:
  saveFusion(): void {
    if (!this.fusionResult) return;

    const saved = JSON.parse(localStorage.getItem('poke-fusions') || '[]');
    saved.push({
      ...this.fusionResult,
      date: new Date().toISOString(),
      id: Date.now()
    });
    localStorage.setItem('poke-fusions', JSON.stringify(saved));

    alert('✅ Fusión guardada en favoritos!');
  }

  getTypeColor(type: string): string {
    const colors: Record<string, string> = {
      fire: '#F08030', water: '#6890F0', grass: '#78C850',
      electric: '#F8D030', psychic: '#F85888', ice: '#98D8D8',
      dragon: '#7038F8', dark: '#705848', fairy: '#EE99AC',
      normal: '#A8A878', fighting: '#C03028', flying: '#A890F0',
      poison: '#A040A0', ground: '#E0C068', rock: '#B8A038',
      bug: '#A8B820', ghost: '#705898', steel: '#B8B8D0'
    };
    return colors[type.toLowerCase()] || '#68A090';
  }

  ngOnInit(): void {
    this.loadRandomPokemons();
  }

  loadRandomPokemons(): void {
    this.loading = true;
    const requests = [
      this.pokemonService.getRandomPokemon(),
      this.pokemonService.getRandomPokemon(),
      this.pokemonService.getRandomPokemon()
    ];

    forkJoin(requests).subscribe({
      next: (results: Pokemon[]) => {
        this.pokemons = results;
        this.fusionResult = this.pokemonService.fusePokemons(results);
        this.loading = false;
        console.log('Fusión creada:', this.fusionResult);
      },
      error: (error: any) => {
        console.error('Error loading pokemons:', error);
        this.loading = false;
      }
    });
  }

  refusion(): void {
    this.loadRandomPokemons();
  }
}