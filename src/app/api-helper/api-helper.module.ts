import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ApiHelperComponent } from './api-helper.component';
import { ApiHelperRoutes } from './api-helper.routes';
import { CoreModule } from '../core/core.module';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        FormsModule,
        RouterModule.forRoot(ApiHelperRoutes)
    ],
    declarations: [ApiHelperComponent],
    exports: [ApiHelperComponent]
})

export class ApiHelperModule { }
