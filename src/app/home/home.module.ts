import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routes';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(HomeRoutes)
    ],
    declarations: [HomeComponent],
    exports: [HomeComponent]
})

export class HomeModule { }
