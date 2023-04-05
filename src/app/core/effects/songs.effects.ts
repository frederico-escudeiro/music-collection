import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { HttpService } from "src/app/http/http.service";
import { SongsActions } from "src/app/store/action-types";

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
}

