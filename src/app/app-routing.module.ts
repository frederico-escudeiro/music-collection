import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GlobalConstants } from 'src/shared/global-constants.enum';
import { FavoritesComponent } from './favorites/favorites.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: GlobalConstants.MY_FAVORITES_STRING, component: FavoritesComponent },
  { path: GlobalConstants.MY_ALBUMS_STRING, loadChildren: () => import('./albums/albums.module').then(m => m.AlbumsModule) },
  { path: GlobalConstants.MY_SONGS_STRING, loadChildren: () => import('./songs/songs.module').then(m => m.SongsModule) },
  { path: GlobalConstants.NOT_FOUND_STRING, component: PageNotFoundComponent },
  { path: '**', redirectTo: '/' + GlobalConstants.NOT_FOUND_STRING } //must be the last one
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
