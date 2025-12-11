import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

export interface Pokemon {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  moves: { move: { name: string } }[];
  sprites: { front_default: string };
}

export interface FusionPokemon {
  name: string;
  types: string[];
  stats: { name: string; value: number }[];
  moves: string[];
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemon(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${id}`);
  }

  getRandomPokemon(): Observable<Pokemon> {
    const randomId = Math.floor(Math.random() * 151) + 1; // Primera generación
    return this.getPokemon(randomId);
  }

  fusePokemons(pokemons: Pokemon[]): FusionPokemon {
    // Lógica de fusión
    const name = this.generateFusionName(pokemons);
    const types = this.fuseTypes(pokemons);
    const stats = this.fuseStats(pokemons);
    const moves = this.fuseMoves(pokemons);
    
    return {
      name,
      types,
      stats,
      moves,
      image: this.generateFusionImage(pokemons)
    };
  }

  private generateFusionName(pokemons: Pokemon[]): string {
    // Ej: "Charzardachu" (primeras sílabas)
    const names = pokemons.map(p => p.name);
    return names.map(name => name.slice(0, Math.ceil(name.length / 2))).join('');
  }

  private fuseTypes(pokemons: Pokemon[]): string[] {
    const allTypes = pokemons.flatMap(p => 
      p.types.map(t => t.type.name)
    );
    return [...new Set(allTypes)].slice(0, 2); // Máximo 2 tipos únicos
  }

  private fuseStats(pokemons: Pokemon[]): { name: string; value: number }[] {
    const statNames = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
    
    return statNames.map(statName => {
      const total = pokemons.reduce((sum, pokemon) => {
        const stat = pokemon.stats.find(s => 
          s.stat.name === statName || 
          s.stat.name.replace('-', '_') === statName
        );
        return sum + (stat?.base_stat || 0);
      }, 0);
      
      return {
        name: statName,
        value: Math.round(total / pokemons.length)
      };
    });
  }

  private fuseMoves(pokemons: Pokemon[]): string[] {
    const allMoves = pokemons.flatMap(p => 
      p.moves.slice(0, 4).map(m => m.move.name) // Toma primeros 4 movimientos de cada uno
    );
    
    // Selecciona 2 movimientos aleatorios
    const shuffled = [...allMoves].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }

  private generateFusionImage(pokemons: Pokemon[]): string {
    // Por simplicidad, usa la imagen del primer Pokémon
    return pokemons[0].sprites.front_default;
  }
}

