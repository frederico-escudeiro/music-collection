import { Injectable } from "@angular/core";
import { HttpService } from "src/app/http/http.service";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { FavoriteAlbumsActions } from "src/app/core/store/action-types";
import { concatMap, map } from "rxjs";

@Injectable()
export class FavoriteAlbumsEffects {

    constructor(private actions$: Actions, private httpService: HttpService) { }

    loadFavoriteAlbums$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(FavoriteAlbumsActions.loadFavoriteAlbums),
                concatMap(() => this.httpService.getFavoriteAlbums),
                map((favoriteAlbums) => FavoriteAlbumsActions.favoriteAlbumsLoaded({ favoriteIds: favoriteAlbums.map(album => album.id!) }))

            )
    )
}