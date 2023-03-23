import { NgModule } from "@angular/core";
import { SongsComponent } from "./songs.component";
import { SharedModule } from "../shared/shared.module";
import { SongsRoutingModule } from "./songs-routing.module";

@NgModule({
    declarations: [
        SongsComponent
    ],
    imports: [
        SharedModule,
        SongsRoutingModule
    ],
    exports: [
        SongsComponent
    ]
})
export class SongsModule {

}