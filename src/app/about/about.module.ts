import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';
import { AboutRoutes } from './about.routes';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(AboutRoutes)
    ],
    declarations: [AboutComponent],
    exports: [AboutComponent]
})

export class AboutModule { }
