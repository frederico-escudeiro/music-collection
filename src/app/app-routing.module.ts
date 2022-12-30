import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AlbumsModule } from './albums/albums.module';
import { SongsModule } from './songs/songs.module';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'not-found', component: PageNotFoundComponent},
  { path: '**', redirectTo: '/not-found'} //must be the last one

]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes), 
    AlbumsModule,
    SongsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
