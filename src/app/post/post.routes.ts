import { Route } from '@angular/router';

import { PostListComponent } from './post-list/post-list.component';

export const PostRoutes: Route[] = [
  {
    path: 'post-list',
    component: PostListComponent
  }
];
