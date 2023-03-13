import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { GlobalConstants } from "src/shared/global-constants.enum";
import { HttpService } from "../http/http.service";

@Injectable()
export class AlbumsGuardService  {

    constructor(private httpService: HttpService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const albumTitle = route.params[GlobalConstants.ALBUM_TITLE_STRING];
        var isValid = !!this.httpService.getAlbumByTitle(albumTitle);
        return isValid ? true : this.router.createUrlTree(['/' + GlobalConstants.MY_ALBUMS_STRING]);
    }
}