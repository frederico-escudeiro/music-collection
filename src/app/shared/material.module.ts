import { ScrollingModule } from "@angular/cdk/scrolling";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatOptionModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTooltip, MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from "@angular/material/snack-bar";

@NgModule({
    imports: [
        MatTooltipModule,
        MatExpansionModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        ScrollingModule,
        MatListModule,
        MatCardModule,
        MatDialogModule,
        MatStepperModule,
        MatDividerModule,
        MatCardModule,
        MatChipsModule
    ],
    providers: [MatSnackBar, MatTooltip],
    exports: [
        MatTooltipModule,
        MatExpansionModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        ScrollingModule,
        MatListModule,
        MatCardModule,
        MatDialogModule,
        MatStepperModule,
        MatDividerModule,
        MatCardModule,
        MatOptionModule,
        MatSelectModule,
        MatChipsModule
    ]
})
export class MaterialModule {

}