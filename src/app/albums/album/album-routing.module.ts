import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { GlobalConstants } from "src/app/shared/global-constants.enum";
import { SongsGuardService } from "src/app/songs/songs.guard";
import { AlbumsComponent } from "../albums.component";
import { AlbumsGuardService } from "../albums.guard";
import { AlbumComponent } from "./album.component";
import { SongComponent } from "./song/song.component";

const albumsRoutes = [
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
    }]

@NgModule({
    imports:[
        RouterModule.forChild(albumsRoutes)
    ],
    providers: [AlbumsGuardService, SongsGuardService],
    exports: [RouterModule]
    })
export class AlbumsRoutingModule {

}