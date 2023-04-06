import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeResolver } from './home.resolver';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { artistsReducer } from '../core/reducers/home.reducers';
import { HomeEffects } from '../core/effects/home.effects';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        EffectsModule.forFeature([HomeEffects]),
        StoreModule.forFeature('artists',artistsReducer)
    ],
    providers: [
        HomeResolver
    ]
})
export class HomeModule {

}