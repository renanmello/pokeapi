import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  IonToast
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../core/services/pokemon.service';
import { FavoritesService } from '../core/services/favorites.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
    IonToast
  ]
})
export class PokemonDetailPage implements OnInit {
  pokemon: any;
  species: any;
  loading = true;
  isFavorite = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private favoritesService: FavoritesService
  ) {}

  async ngOnInit() {
    const pokemonId = this.route.snapshot.paramMap.get('id');
    if (pokemonId) {
      await this.loadPokemonDetails(pokemonId);
    }
  }

  async loadPokemonDetails(pokemonId: string) {
    try {
      this.loading = true;
      this.pokemon = await this.pokemonService.getPokemonDetails(pokemonId);
      this.species = await this.pokemonService.getPokemonSpecies(pokemonId);
      this.isFavorite = await this.favoritesService.isFavorite(this.pokemon.id);
    } catch (error) {
      console.error('Error loading pokemon details:', error);
    } finally {
      this.loading = false;
    }
  }

  async toggleFavorite() {
    if (this.isFavorite) {
      await this.favoritesService.removeFavorite(this.pokemon.id);
    } else {
      await this.favoritesService.addFavorite(this.pokemon);
    }
    this.isFavorite = !this.isFavorite;
  }

  getStatPercentage(statValue: number): number {
    return (statValue / 255) * 100;
  }

  getPokemonImageUrl(): string {
    return this.pokemon.sprites.other['official-artwork']?.front_default || 
           this.pokemon.sprites.front_default;
  }

  getTypeColor(type: string): string {
    const typeColors: Record<string, string> = {
      normal: 'medium',
      fire: 'danger',
      water: 'primary',
      electric: 'warning',
      grass: 'success',
      ice: 'light',
      fighting: 'danger',
      poison: 'tertiary',
      ground: 'tertiary',
      flying: 'medium',
      psychic: 'tertiary',
      bug: 'success',
      rock: 'medium',
      ghost: 'dark',
      dragon: 'tertiary',
      dark: 'dark',
      steel: 'medium',
      fairy: 'tertiary',
    };
    return typeColors[type.toLowerCase()] || 'primary';
  }
}