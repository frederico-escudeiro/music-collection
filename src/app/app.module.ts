import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatStepperModule } from '@angular/material/stepper';

import { AlbumsModule } from './albums/albums.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AddAlbumComponent } from './home/add-album/add-album.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SongsModule } from './songs/songs.module';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    HomeComponent,
    PageNotFoundComponent,
    FavoritesComponent,
    AddAlbumComponent
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
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ScrollingModule,
    ReactiveFormsModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    FlexLayoutModule,
    MatStepperModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
