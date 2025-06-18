import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private _storage: Storage | null = null;
  constructor(private storage: Storage   
  ) {
    this.init();
   }

   async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async addFavorite(pokemon: any) {
    const favorites = await this.getFavorites();
    if (!favorites.some((fav: any) => fav.id === pokemon.id)) {
      favorites.push(pokemon);
      await this._storage?.set('favorites', favorites);
    }
  }

  async removeFavorite(pokemonId: number) {
    let favorites = await this.getFavorites();
    favorites = favorites.filter((fav: any) => fav.id !== pokemonId);
    await this._storage?.set('favorites', favorites);
  }

  async getFavorites(): Promise<any[]> {
    const favorites = await this._storage?.get('favorites');
    return favorites || [];
  }

  async isFavorite(pokemonId: number): Promise<boolean> {
    const favorites = await this.getFavorites();
    return favorites.some((fav: any) => fav.id === pokemonId);
  }

}
