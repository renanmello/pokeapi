import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from '../core/services/pokemon.service';
import { FavoritesService } from '../core/services/favorites.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonBackButton,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonChip,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonBadge,
  IonProgressBar,
  IonToast, IonSearchbar, IonRefresher, IonRefresherContent, IonGrid, IonRow, IonCol, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonCardComponent } from "../components/pokemon-card/pokemon-card.component";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
  imports: [IonInfiniteScrollContent, IonInfiniteScroll, IonCol, IonRow, IonGrid, IonRefresherContent, IonRefresher, IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButtons,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonChip,
    IonList,
    IonItem,
    IonLabel,
    IonNote,
    IonBadge,
    IonHeader,
    IonProgressBar,
    IonToast, IonSearchbar, PokemonCardComponent]
})
export class PokemonListPage implements OnInit, OnDestroy {
  pokemons: any[] = [];
  filteredPokemons: any[] = [];
  offset = 0;
  limit = 20;
  loading = false;
  searchControl = new FormControl('');
  private destroy$ = new Subject<void>();

  constructor(
    private pokemonService: PokemonService,
    private favoritesService: FavoritesService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.loadPokemons();
    this.setupSearch();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSearch() {
    this.searchControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(async (term) => {
        return await this.searchPokemon(term ?? '');
      });
  }

  async loadPokemons(event?: any) {
    if (this.loading) return;

    this.loading = true;
    try {
      const response = await this.pokemonService.getPokemonList(this.offset, this.limit);
      const pokemonDetails = await Promise.all(
        response.results.map(async (pokemon: any) => {
          const details = await this.pokemonService.getPokemonDetails(pokemon.name);
          const isFavorite = await this.favoritesService.isFavorite(details.id);
          return { ...details, isFavorite };
        })
      );

      this.pokemons = [...this.pokemons, ...pokemonDetails];
      this.filteredPokemons = [...this.pokemons];
      this.offset += this.limit;

      if (event) {
        event.target.complete();
        if (response.results.length < this.limit) {
          event.target.disabled = true;
        }
      }
    } catch (error) {
      console.error('Error loading pokemons:', error);
      if (event) {
        event.target.complete();
      }
    } finally {
      this.loading = false;
    }
  }

  async searchPokemon(term: string) {
    if (!term || term.trim() === '') {
      this.filteredPokemons = [...this.pokemons];
      return;
    }

    try {
      const found = this.pokemons.filter(p => 
        p.name.toLowerCase().includes(term.toLowerCase())
      );
      
      if (found.length > 0) {
        this.filteredPokemons = found;
      } else {
        const pokemon = await this.pokemonService.getPokemonDetails(term.toLowerCase());
        pokemon.isFavorite = await this.favoritesService.isFavorite(pokemon.id);
        this.filteredPokemons = [pokemon];
      }
    } catch (error) {
      this.filteredPokemons = [];
    }
  }

  async toggleFavorite(pokemon: any, event: Event) {
    event.stopPropagation();
    if (pokemon.isFavorite) {
      await this.favoritesService.removeFavorite(pokemon.id);
    } else {
      await this.favoritesService.addFavorite(pokemon);
    }
    pokemon.isFavorite = !pokemon.isFavorite;
  }

  goToDetails(pokemonId: number) {
    this.router.navigate(['/pokemon-detail', pokemonId]);
  }

  trackByPokemonId(index: number, pokemon: any): number {
    return pokemon.id;
  }

  async refreshList(event: any) {
    this.offset = 0;
    this.pokemons = [];
    this.filteredPokemons = [];
    await this.loadPokemons();
    event.target.complete();
  }
}