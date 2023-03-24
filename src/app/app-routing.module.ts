import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GlobalConstants } from 'src/app/shared/global-constants.enum';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', loadChildren:()=> import('./home/home.module').then(m => m.HomeModule) },
  { path: GlobalConstants.MY_FAVORITES_STRING, loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesModule) },
  { path: GlobalConstants.MY_ALBUMS_STRING, loadChildren: () => import('./albums/albums.module').then(m => m.AlbumsModule) },
  { path: GlobalConstants.MY_SONGS_STRING, loadChildren: () => import('./songs/songs.module').then(m => m.SongsModule) },
  { path: GlobalConstants.NOT_FOUND_STRING, component: PageNotFoundComponent },
  { path: '**', redirectTo: '/' + GlobalConstants.NOT_FOUND_STRING }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
