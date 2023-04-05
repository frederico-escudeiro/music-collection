import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { SongsComponent } from "./songs.component";
import { SharedModule } from "../shared/shared.module";
import { SongsRoutingModule } from "./songs-routing.module";
import { SongsEffects } from "../core/effects/songs.effects";
import { StoreModule } from "@ngrx/store";
import { songsReducer } from "../core/reducers/songs.reducers";

@NgModule({
    declarations: [
        SongsComponent
    ],
    imports: [
        SharedModule,
        SongsRoutingModule,
        StoreModule.forFeature("songs", songsReducer),
        EffectsModule.forFeature([SongsEffects])
    ],
    exports: [
        SongsComponent
    ]
})
export class SongsModule {

}