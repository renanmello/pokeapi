import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IonicModule, IonInfiniteScroll } from '@ionic/angular';
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


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'pokemon-list',
    loadChildren: () => import('./pokemon-list/pokemon-list.module').then(m => m.PokemonListPageModule)
  },
  {
    path: 'pokemon-detail/:id',  // Adicione o parâmetro :id
    loadChildren: () => import('./pokemon-detail/pokemon-detail.module').then(m => m.PokemonDetailPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesPageModule)
  },
];


@NgModule({
  imports: [
    
    IonicModule.forRoot(),
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
