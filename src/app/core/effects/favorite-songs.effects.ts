import { Injectable } from "@angular/core";
import { HttpService } from "src/app/http/http.service";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { FavoriteSongsActions } from "src/app/core/store/action-types";
import { concatMap, map } from "rxjs";

@Injectable()
export class FavoriteSongsEffects {

    constructor(private actions$: Actions, private httpService: HttpService) { }

    loadFavoriteAlbums$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(FavoriteSongsActions.loadFavoriteSongs),
                concatMap(() => this.httpService.getFavoriteSongs),
                map((favoriteSongs) => FavoriteSongsActions.favoriteSongsLoaded({ favoriteIds: favoriteSongs.map(song => song.song!.id!) }))

            )
    )
}