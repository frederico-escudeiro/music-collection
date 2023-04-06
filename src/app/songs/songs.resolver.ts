import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { finalize, first, tap } from "rxjs";
import { AppState } from "../core/store/app.reducers";
import { SongsActions } from "../core/store/action-types";

@Injectable()
export class SongsResolver implements Resolve<any>{

    loading = false;

    constructor(private store: Store<AppState>){ }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.pipe(
            tap(()=>{ //Side effect of the observable: dispatch action
                if(!this.loading){
                    this.loading = true;
                    this.store.dispatch(SongsActions.loadAllSongs())
                }
            }),
            first(), //Return a value for Observable completion.          
            finalize( ()=> this.loading = false)
        )
    }
}