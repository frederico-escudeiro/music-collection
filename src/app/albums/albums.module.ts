import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core'
import { RouterModule } from "@angular/router";
import { SongComponent } from "./album/song/song.component";
import { SongsGuardService } from "../songs/songs.guard";
import { AlbumComponent } from "./album/album.component";
import { AlbumsComponent } from "./albums.component";
import { AlbumsGuardService } from "./albums.guard";
import { AlbumDetailComponent } from './album/album-detail/album-detail.component';
import { GlobalConstants } from "src/app/shared/global-constants.enum";
import { SharedModule } from "../shared/shared.module";
import { AlbumsRoutingModule } from "./album/album-routing.module";
import { EditSongComponent } from './album/song/edit-song/edit-song.component';
import { EditAlbumComponent } from './album/edit-album/edit-album.component';

@NgModule({
    declarations: [
        AlbumsComponent,
        AlbumComponent,
        SongComponent,
        AlbumDetailComponent,
        EditSongComponent,
        EditAlbumComponent
    ],
    imports: [
        SharedModule,
        AlbumsRoutingModule
    ],

    exports: [
        AlbumsComponent,
        AlbumComponent,
        SongComponent
    ]
})
export class AlbumsModule {

}