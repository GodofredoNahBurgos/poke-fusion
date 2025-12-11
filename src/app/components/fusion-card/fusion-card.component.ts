import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FusionPokemon } from '../../services/pokemon.service';

@Component({
  selector: 'app-fusion-card',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatChipsModule, 
    MatButtonModule,
    MatProgressBarModule
  ],
  templateUrl: './fusion-card.component.html',
  styleUrls: ['./fusion-card.component.scss']
})
export class FusionCardComponent {
  @Input() fusion!: FusionPokemon;
  @Input() showSaveButton = true;

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

  saveFusion(): void {
    console.log('Guardando fusión:', this.fusion);
  }

  shareFusion(): void {
    console.log('Compartiendo fusión:', this.fusion);
  }

  get imageUrl(): string {
    return this.fusion?.image || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
  }
}