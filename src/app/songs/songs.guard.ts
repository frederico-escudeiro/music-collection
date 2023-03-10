import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { GlobalConstants } from "src/shared/global.constants";
import { HttpService } from "../http/http.service";

@Injectable()
export class SongsGuardService implements CanActivate {

    constructor(private httpService: HttpService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        let isValid: boolean = !!this.httpService.getSongByTitle(route.params['songTitle']);

        return isValid ? true : this.router.createUrlTree(['/' + GlobalConstants.MY_SONGS_STRING]);
    }
}