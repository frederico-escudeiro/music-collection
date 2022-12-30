import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AlbumComponent } from "./album/album.component";
import { AlbumsComponent } from "./albums.component";

@NgModule({
    declarations: [
        AlbumsComponent,
        AlbumComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: 'myalbums', component: AlbumsComponent },
            { path: 'myalbums/:albumTitle', component: AlbumComponent }
        ])
    ],
    exports: [
        AlbumsComponent,
        AlbumComponent
    ]
})
export class AlbumsModule {

}