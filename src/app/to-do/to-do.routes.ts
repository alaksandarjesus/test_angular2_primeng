import { Route } from '@angular/router';

import { ToDoDetailsComponent } from './to-do-details/to-do-details.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';

export const ToDoRoutes: Route[] = [
  {
    path: 'to-do-list',
    component: ToDoListComponent
  },
  {
    path: 'to-do-details/:id',
    component: ToDoDetailsComponent
  }
];
