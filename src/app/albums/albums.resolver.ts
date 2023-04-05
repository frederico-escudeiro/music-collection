import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { finalize, first, Observable, tap } from "rxjs";
import { AppState } from "../store/app.state";
import { AlbumsActions } from "../store/action-types";


@Injectable()
export class AlbumsResolver implements Resolve<any>{

    loading = false;

    constructor(private store: Store<AppState>) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.store
            .pipe(
                tap(() => {
                    if (!this.loading) {
                        this.loading = true;
                        this.store.dispatch(AlbumsActions.loadAllAlbums())
                    }
                }),
                first(),
                finalize(()=> this.loading = false)
            );
    }

}