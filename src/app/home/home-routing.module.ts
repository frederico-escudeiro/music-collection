import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { HomeResolver } from "./home.resolver";

const homeRoutes = [
    { path: '', component: HomeComponent, resolve: { artists: HomeResolver } },
]

@NgModule({
    imports: [
        RouterModule.forChild(homeRoutes)
    ],
    exports: [RouterModule]
})
export class HomeRoutingModule {

}