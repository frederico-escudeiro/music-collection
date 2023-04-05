import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { HttpService } from "src/app/http/http.service";
import { ArtistsActions } from "src/app/store/action-types";
import { allArtistsLoaded } from "../actions/home.actions";

@Injectable()
export class HomeEffects {



    constructor(
        private actions$: Actions,
        private httpService: HttpService
    ) { }

    loadArtists$ = createEffect(
        () => this.actions$.pipe(
            ofType(ArtistsActions.loadAllArtists),
            concatMap(() => this.httpService.getAllArtists),
            map(artists => allArtistsLoaded({ artists: artists }))
        )
    );
}

