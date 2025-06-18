import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokemonListPageRoutingModule } from './pokemon-list-routing.module';

import { PokemonListPage } from './pokemon-list.page';

import { PokemonCardComponent } from '../components/pokemon-card/pokemon-card.component';
import { RouterModule } from '@angular/router';

import { FavoritesService } from '../core/services/favorites.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    PokemonListPageRoutingModule,
    ReactiveFormsModule,
    PokemonListPage,
    PokemonCardComponent    
    
  ],
  
  exports: [
    PokemonCardComponent // Opcional: se for usar em outros módulos
  ],
   providers: [FavoritesService]
})
export class PokemonListPageModule {}
