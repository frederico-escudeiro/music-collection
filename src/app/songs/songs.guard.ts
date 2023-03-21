import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { GlobalConstants } from "src/app/shared/global-constants.enum";
import { HttpService } from "../http/http.service";

@Injectable()
export class SongsGuardService {

    constructor(private httpService: HttpService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        let isValid: boolean = !!this.httpService.getSongByTitle(route.params['songTitle']);

        return isValid ? true : this.router.createUrlTree(['/' + GlobalConstants.MY_SONGS_STRING]);
    }
}