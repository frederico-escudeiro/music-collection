import { NgModule } from '@angular/core'
import { SongComponent } from "./album/song/song.component";
import { AlbumComponent } from "./album/album.component";
import { AlbumsComponent } from "./albums.component";
import { AlbumDetailComponent } from './album/album-detail/album-detail.component';
import { SharedModule } from "../shared/shared.module";
import { AlbumsRoutingModule } from "./albums-routing.module";
import { EditSongComponent } from './album/song/edit-song/edit-song.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { albumsReducer } from '../core/reducers/albums.reducers';
import { AlbumsEffects } from '../core/effects/albums.effects';

@NgModule({
    declarations: [
        AlbumsComponent,
        AlbumComponent,
        SongComponent,
        AlbumDetailComponent,
        EditSongComponent,
    ],
    imports: [
        SharedModule,
        AlbumsRoutingModule,
        StoreModule.forFeature("albums", albumsReducer),
        EffectsModule.forFeature([AlbumsEffects])
    ],

    exports: [
        AlbumsComponent,
        AlbumComponent,
        SongComponent
    ]
})
export class AlbumsModule {

}