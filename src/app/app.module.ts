import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AlbumsModule } from './albums/albums.module';
import { SongsModule } from './songs/songs.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { FavoritesComponent } from './favorites/favorites.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    HomeComponent,
    PageNotFoundComponent,
    FavoritesComponent,
  ],
  providers: [MatSnackBar, MatTooltip],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AlbumsModule,
    SongsModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatExpansionModule,
    MatButtonModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
