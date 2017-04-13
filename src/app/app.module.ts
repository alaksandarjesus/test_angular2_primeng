// Angular Core
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// 3rd Party
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

// App Modules
import { AboutModule } from './about/about.module';
import { ApiHelperModule } from './api-helper/api-helper.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { CoreModule } from './core/core.module';
import { CoreRoutes } from './core/core.routes';
import { HomeModule } from './home/home.module';
import { PostModule } from './post/post.module';
import { StyleGuideModule } from './style-guide/style-guide.module';
import { ToDoModule } from './to-do/to-do.module';

import { EnvironmentService } from './core/config/environment.service';
import {SpinnerModule} from 'primeng/primeng';
export function getAuthHttp(http) {
    let environmentService = new EnvironmentService();
    return new AuthHttp(new AuthConfig({
      tokenName: environmentService.AuthCredentials.localStorageProperty
    }), http);
}


@NgModule({
  imports: [
    AboutModule,
    ApiHelperModule,
    CoreModule,
    HomeModule,
    PostModule,
    StyleGuideModule,
    ToDoModule,
    BrowserModule,
    FormsModule,
     ReactiveFormsModule,
    HttpModule,
    SpinnerModule,
    RouterModule.forRoot(CoreRoutes)
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    }
  ],
  bootstrap: [AppComponent, AboutComponent]
})
export class AppModule { }
