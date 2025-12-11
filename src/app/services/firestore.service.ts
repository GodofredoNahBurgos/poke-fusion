import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs } from '@angular/fire/firestore';
import { FusionPokemon } from './pokemon.service';

export interface SavedFusion extends FusionPokemon {
  id?: string;
  date: Date;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  // NO inicialices aquí, hazlo en el constructor
  
  constructor(private firestore: Firestore) {}

  // Método para obtener la colección
  private getFusionsCollection() {
    return collection(this.firestore, 'fusions');
  }

  // Guardar fusión en Firestore
  async saveFusion(fusion: FusionPokemon): Promise<string> {
    try {
      const docRef = await addDoc(this.getFusionsCollection(), {
        name: fusion.name,
        types: fusion.types,
        stats: fusion.stats,
        moves: fusion.moves,
        image: fusion.image || '',
        date: new Date().toISOString(),
        timestamp: Date.now()
      });
      console.log('Fusión guardada con ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error guardando en Firestore:', error);
      throw error;
    }
  }

  // Obtener todas las fusiones guardadas
  async getSavedFusions(): Promise<SavedFusion[]> {
    try {
      const querySnapshot = await getDocs(this.getFusionsCollection());
      const fusions: SavedFusion[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Omit<SavedFusion, 'id'>;
        fusions.push({
          id: doc.id,
          ...data
        });
      });
      
      return fusions.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error('Error obteniendo fusiones:', error);
      return [];
    }
  }
}