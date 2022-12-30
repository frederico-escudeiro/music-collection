import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SongComponent } from "./song/song.component";
import { SongsComponent } from "./songs.component";

@NgModule({
    declarations: [
        SongsComponent,
        SongComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: 'myalbums/:albumTitle/:songTitle', component: SongComponent},
            { path: 'mysongs', component: SongsComponent },
        ]
        )
    ],
    exports: [
        SongsComponent,
        SongComponent
    ]
})
export class SongsModule {

}