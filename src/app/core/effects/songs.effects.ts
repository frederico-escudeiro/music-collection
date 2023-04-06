import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map, tap } from "rxjs/operators";
import { HttpService } from "src/app/http/http.service";
import { AlbumsActions, ArtistsActions, SongsActions } from "src/app/core/store/action-types";

@Injectable()
export class SongsEffects {



    constructor(
        private actions$: Actions,
        private httpService: HttpService
    ) { }

    loadSongs$ = createEffect(
        () => this.actions$.pipe(
            ofType(SongsActions.loadAllSongs),
            concatMap(() => this.httpService.getAllSongs),
            map(songs => SongsActions.allSongsLoaded({ songs: songs }))
        )
    );

    editSong$ = createEffect(
        ()=> this.actions$.pipe(
            ofType(SongsActions.editSong),
            tap((action) => AlbumsActions.updateAlbumWithNewSong(action)),
            map((action) => ArtistsActions.updateArtistWithNewAlbum(action))
        )
    )
}

