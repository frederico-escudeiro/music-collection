import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SongsComponent } from "./songs.component";
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
    declarations: [
        SongsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: SongsComponent },
        ]
        ),
        MatListModule,
        MatDividerModule,
        FlexLayoutModule
    ],
    exports: [
        SongsComponent
    ]
})
export class SongsModule {

}