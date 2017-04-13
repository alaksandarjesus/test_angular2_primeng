import { APP_BASE_HREF } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AuthService } from './auth/shared/auth.service';
import { EnvironmentService } from './config/environment.service';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LogInComponent } from './auth/log-in.component';
import { LogService } from './log/log.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { SiteMapComponent } from './site-map/site-map.component';

export function getAuthHttp(http) {
    let environmentService = new EnvironmentService();
    return new AuthHttp(new AuthConfig({
        tokenName: environmentService.AuthCredentials.localStorageProperty
    }), http);
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        RouterModule
    ],
    declarations: [
        FooterComponent,
        HeaderComponent,
        LogInComponent,
        NotFoundComponent,
        SiteMapComponent
    ],
    exports: [
        FooterComponent,
        HeaderComponent,
        LogInComponent,
        NotFoundComponent,
        SiteMapComponent
    ],
    providers: [
        AuthService,
        EnvironmentService,
        LogService,
        { provide: APP_BASE_HREF, useValue: '/' },
        {
            provide: AuthHttp,
            useFactory: getAuthHttp,
            deps: [Http]
        }
    ]
})

export class CoreModule { }
