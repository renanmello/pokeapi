import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor() { }

  async getPokemonList(offset: number = 0, limit: number = 20) {
    try {
      const response = await axios.get(`${this.apiUrl}/pokemon?offset=${offset}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
      throw error;
    }
  }

  async getPokemonDetails(idOrName: string | number) {
    try {
      const response = await axios.get(`${this.apiUrl}/pokemon/${idOrName}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
      throw error;
    }
  }

  async getPokemonSpecies(idOrName: string | number) {
    try {
      const response = await axios.get(`${this.apiUrl}/pokemon-species/${idOrName}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Pokemon species:', error);
      throw error;
    }
  }

}
