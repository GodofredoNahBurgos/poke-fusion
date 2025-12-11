import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Pokemon } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-selector',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './pokemon-selector.component.html',
  styleUrls: ['./pokemon-selector.component.scss']
})
export class PokemonSelectorComponent {
  @Input() pokemon!: Pokemon;
  @Input() index!: number;
  @Output() randomize = new EventEmitter<number>();

  // AÑADE ESTA FUNCIÓN:
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

  onRandomize(): void {
    this.randomize.emit(this.index);
  }
}