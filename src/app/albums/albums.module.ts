import { NgModule } from '@angular/core'
import { SongComponent } from "./album/song/song.component";
import { AlbumComponent } from "./album/album.component";
import { AlbumsComponent } from "./albums.component";
import { AlbumDetailComponent } from './album/album-detail/album-detail.component';
import { SharedModule } from "../shared/shared.module";
import { AlbumsRoutingModule } from "./album/album-routing.module";
import { EditSongComponent } from './album/song/edit-song/edit-song.component';

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