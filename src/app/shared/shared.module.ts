import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddAlbumComponent } from "../home/add-album/add-album.component";
import { MaterialModule } from "./material.module";

@NgModule({
    declarations:[
        AddAlbumComponent
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
        MaterialModule,
    ]
})
export class SharedModule{

}