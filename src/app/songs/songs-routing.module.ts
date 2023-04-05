import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SongsComponent } from "./songs.component";
import { SongsResolver } from "./songs.resolver";

const songsRoutes: Routes = [
    { path: '', component: SongsComponent, resolve: { songs: SongsResolver } },
]

@NgModule({
    imports: [
        RouterModule.forChild(songsRoutes)
    ],
    exports: [RouterModule],
    providers: [SongsResolver]
})
export class SongsRoutingModule {

}