import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { finalize, first, Observable, tap } from "rxjs";
import { AppState } from "../core/store/app.state";
import { FavoriteAlbumsActions, FavoriteSongsActions } from "../core/store/action-types";


@Injectable()
export class FavoritesResolver implements Resolve<any>{

    loading = false;

    constructor(private store: Store<AppState>) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.store
            .pipe(
                tap(() => {
                    if (!this.loading) {
                        this.loading = true;
                        this.store.dispatch(FavoriteAlbumsActions.loadFavoriteAlbums())
                        this.store.dispatch(FavoriteSongsActions.loadFavoriteSongs())
                    }
                }),
                first(),
                finalize(()=> this.loading = false)
            );
    }

}