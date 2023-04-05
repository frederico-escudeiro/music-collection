import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { FavoriteAlbumsEffects } from "../core/effects/favorite-albums.effects";
import { favoriteAlbumsReducer } from "../core/reducers/favorite-albums.reducers";
import { SharedModule } from "../shared/shared.module";
import { FavoritesRoutingModule } from "./favorites-routing.module";
import { FavoritesComponent } from "./favorites.component";

@NgModule({
    declarations:[
        FavoritesComponent
    ],
    imports:[
        SharedModule,
        FavoritesRoutingModule,
        StoreModule.forFeature("favoriteAlbums", favoriteAlbumsReducer),
        EffectsModule.forFeature(FavoriteAlbumsEffects)
    ]
})
export class FavoritesModule{

}