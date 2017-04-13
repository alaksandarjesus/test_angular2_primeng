import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module';
import { PostModule } from '../post/post.module';
import { ToDoDetailsComponent } from './to-do-details/to-do-details.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { ToDoRoutes } from './to-do.routes';
import { ToDoService } from './shared/to-do.service';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        FormsModule,
        PostModule,
        RouterModule.forRoot(ToDoRoutes)
    ],
    declarations: [ToDoListComponent, ToDoDetailsComponent],
    exports: [ToDoListComponent, ToDoDetailsComponent],
    providers: [ToDoService]
})

export class ToDoModule { }
