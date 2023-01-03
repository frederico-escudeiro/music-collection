import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SongComponent } from "../songs/song/song.component";
import { AlbumComponent } from "./album/album.component";
import { AlbumsComponent } from "./albums.component";

@NgModule({
    declarations: [
        AlbumsComponent,
        AlbumComponent,
        SongComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: AlbumsComponent },
            { path: ':albumTitle', component: AlbumComponent },
            { path: ':albumTitle/:songTitle', component: SongComponent }
        ])
    ],
    exports: [
        AlbumsComponent,
        AlbumComponent,
        SongComponent
    ]
})
export class AlbumsModule {

}