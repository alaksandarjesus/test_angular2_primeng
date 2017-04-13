import { Route } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { SiteMapComponent } from './site-map/site-map.component';

export const CoreRoutes: Route[] = [
    {
        path: 'site-map',
        component: SiteMapComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
