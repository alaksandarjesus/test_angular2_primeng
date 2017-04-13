import { Routes } from '@angular/router';

import { ApiHelperRoutes } from './api-helper/api-helper.routes';
import { CoreRoutes } from './core/core.routes';
import { HomeRoutes } from './home/home.routes';
import { PostRoutes } from './post/post.routes';
import { StyleGuideRoutes } from './style-guide/style-guide.routes';
import { ToDoRoutes } from './to-do/to-do.routes';

export const AppRoutes: Routes = [
  ...ApiHelperRoutes,
  ...CoreRoutes,
  ...HomeRoutes,
  ...PostRoutes,
  ...StyleGuideRoutes,
  ...ToDoRoutes
];
