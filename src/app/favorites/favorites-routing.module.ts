import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FavoritesComponent } from "./favorites.component";
import { FavoritesResolver } from "./favorites.resolver";

const favoritesRoutes: Routes = [
    { path: '', component: FavoritesComponent, resolve: { favorites: FavoritesResolver } }
]

@NgModule({
    imports: [
        RouterModule.forChild(favoritesRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers:[
        FavoritesResolver
    ]
})
export class FavoritesRoutingModule { }