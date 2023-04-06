import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, UrlTree } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { GlobalConstants } from "src/app/shared/global-constants.enum";
import { selectAllAlbums } from "../core/selectors/albums.selectors";
import { AppState } from "../core/store/app.reducers";
import { HttpService } from "../http/http.service";

@Injectable()
export class AlbumsGuardService {

    isValid: boolean = false;
    constructor(private httpService: HttpService, private router: Router, private store: Store<AppState>) { }

    async canActivate(route: ActivatedRouteSnapshot): Promise<boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>> {
        const albumTitle = route.params[GlobalConstants.ALBUM_TITLE_STRING];
        let albums = this.store.pipe(select(selectAllAlbums))
        albums.subscribe(albums => this.isValid = albums.some(album => album.title === albumTitle));
        return this.isValid ? true : this.router.createUrlTree(['/' + GlobalConstants.MY_ALBUMS_STRING]);
    }
}