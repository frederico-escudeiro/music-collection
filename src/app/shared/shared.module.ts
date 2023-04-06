import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AlbumsEffects } from "../core/effects/albums.effects";
import { HomeEffects } from "../core/effects/home.effects";
import { MaterialModule } from "./material.module";
import { ModifyAlbumComponent } from "./modify-album/modify-album.component";

@NgModule({
    declarations:[
        ModifyAlbumComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialModule,
    ],
    exports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialModule
    ]
})
export class SharedModule{

}