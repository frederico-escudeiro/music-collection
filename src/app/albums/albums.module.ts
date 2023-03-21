import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core'
import { RouterModule } from "@angular/router";
import { SongComponent } from "../songs/song/song.component";
import { SongsGuardService } from "../songs/songs.guard";
import { AlbumComponent } from "./album/album.component";
import { AlbumsComponent } from "./albums.component";
import { AlbumsGuardService } from "./albums.guard";
import { AlbumDetailComponent } from './album/album-detail/album-detail.component';
import { GlobalConstants } from "src/app/shared/global-constants.enum";

@NgModule({
    declarations: [
        AlbumsComponent,
        AlbumComponent,
        SongComponent,
        AlbumDetailComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: AlbumsComponent },
            {
                path: ':' + GlobalConstants.ALBUM_TITLE_STRING,
                component: AlbumComponent,
                canActivate: [AlbumsGuardService],
                children: [

                    { path: GlobalConstants.FAVORITE_STRING, component: AlbumComponent },
                ]
            }, {
                path: ':' + GlobalConstants.ALBUM_TITLE_STRING + '/:' + GlobalConstants.SONG_TITLE_STRING,
                component: SongComponent,
                canActivate: [SongsGuardService],
                children: [
                    { path: GlobalConstants.FAVORITE_STRING, component: SongComponent }
                ]
            }

        ])
    ],
    providers: [AlbumsGuardService, SongsGuardService],
    exports: [
        AlbumsComponent,
        AlbumComponent,
        SongComponent
    ]
})
export class AlbumsModule {

}