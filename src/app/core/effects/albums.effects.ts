import { Injectable } from "@angular/core";
import { HttpService } from "src/app/http/http.service";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { AlbumsActions } from "src/app/core/store/action-types";
import { concatMap, map } from "rxjs";

@Injectable()
export class AlbumsEffects{

    constructor(private actions$: Actions, private httpService: HttpService){}

    loadAllAlbums$ = createEffect(
            () => this.actions$
                .pipe(
                ofType(AlbumsActions.loadAllAlbums),
                concatMap(()=> this.httpService.getAllAlbums),
                map((albums)=> AlbumsActions.allAlbumsLoaded({albums:albums}))
            )
    )
}