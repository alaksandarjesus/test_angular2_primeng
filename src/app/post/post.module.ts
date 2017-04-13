import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module';
import { PostListComponent } from './post-list/post-list.component';
import { PostRoutes } from './post.routes';
import { PostService } from './shared/post.service';

@NgModule({
    imports: [
        CoreModule,
        CommonModule,
        RouterModule.forRoot(PostRoutes)
    ],
    declarations: [PostListComponent],
    exports: [PostListComponent],
    providers: [PostService]
})

export class PostModule { }
