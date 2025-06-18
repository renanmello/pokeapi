import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private storageInitialized = false;

  constructor(private storage: Storage) {
    this.initializeStorage();
  }

  private async initializeStorage() {
    try {
      await this.storage.create();
      this.storageInitialized = true;
    } catch (error) {
      console.error('Error initializing storage:', error);
    }
  }

  private async ensureStorageReady(): Promise<void> {
    if (!this.storageInitialized) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return this.ensureStorageReady();
    }
  }

  async addFavorite(pokemon: any): Promise<void> {
    await this.ensureStorageReady();
    const favorites = await this.getFavorites();
    if (!favorites.some((fav: any) => fav.id === pokemon.id)) {
      favorites.push(pokemon);
      await this.storage.set('favorites', favorites);
    }
  }

  async removeFavorite(pokemonId: number): Promise<void> {
    await this.ensureStorageReady();
    let favorites = await this.getFavorites();
    favorites = favorites.filter((fav: any) => fav.id !== pokemonId);
    await this.storage.set('favorites', favorites);
  }

  async getFavorites(): Promise<any[]> {
    await this.ensureStorageReady();
    const favorites = await this.storage.get('favorites');
    return favorites || [];
  }

  async isFavorite(pokemonId: number): Promise<boolean> {
    await this.ensureStorageReady();
    const favorites = await this.getFavorites();
    return favorites.some((fav: any) => fav.id === pokemonId);
  }
}