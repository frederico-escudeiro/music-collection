import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { finalize, first, tap } from "rxjs";
import { AppState } from "../core/store/app.reducers";
import { ArtistsActions } from "../core/store/action-types";
import { loadAllArtists } from "../core/actions/home.actions";

@Injectable()
export class HomeResolver implements Resolve<any>{

    loading = false;

    constructor(private store: Store<AppState>){ }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.pipe(
            tap(()=>{
                if(!this.loading){
                    this.loading = true;
                    this.store.dispatch(ArtistsActions.loadAllArtists())
                }
            }),
            first(),          
            finalize( ()=> this.loading = false)
        )
    }
}