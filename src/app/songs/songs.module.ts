import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SongsComponent } from "./songs.component";

@NgModule({
    declarations: [
        SongsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: SongsComponent },
        ]
        )
    ],
    exports: [
        SongsComponent
    ]
})
export class SongsModule {

}