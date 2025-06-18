import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { IonCard, IonChip, IonCardHeader, IonCardTitle, IonFabButton, IonCardContent, IonCardSubtitle, IonFab, IonIcon } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  imports: [IonIcon, IonFab, IonCardSubtitle, IonCardContent, IonFabButton, IonCardTitle, IonCardHeader, IonChip, IonCard,CommonModule ]
})
export class PokemonCardComponent  implements OnInit {
handleImageError($event: ErrorEvent) {
throw new Error('Method not implemented.');
}
  @Input() pokemon: any;
  @Output() favoriteToggled = new EventEmitter<{pokemon: any, event: Event}>();

  constructor(private animationCtrl: AnimationController) { }
  
  toggleFavorite(event: Event) {
    event.stopPropagation();
    this.favoriteToggled.emit({pokemon: this.pokemon, event});
    this.playPulseAnimation(event.target as HTMLElement);
  }
  
  getPokemonImageUrl(): string {
    return this.pokemon.sprites.other['official-artwork']?.front_default || 
           this.pokemon.sprites.front_default ||
           'assets/pokeball.png';
  }
  ngOnInit() {}
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

  private playPulseAnimation(element: HTMLElement) {
    const animation = this.animationCtrl.create()
      .addElement(element)
      .duration(500)
      .keyframes([
        { offset: 0, transform: 'scale(1)' },
        { offset: 0.5, transform: 'scale(1.3)' },
        { offset: 1, transform: 'scale(1)' }
      ]);
    animation.play();
  }
}
