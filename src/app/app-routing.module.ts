import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [ 
  { path: '', component: HomeComponent },
  { path: 'myalbums', loadChildren: () => import('./albums/albums.module').then(m => m.AlbumsModule) },
  { path: 'mysongs', loadChildren: () => import('./songs/songs.module').then(m => m.SongsModule) },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' } //must be the last one

]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
