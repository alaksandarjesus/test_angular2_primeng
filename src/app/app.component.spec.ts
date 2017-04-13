// Angular Core
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async } from '@angular/core/testing';

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
import { provideAuth } from 'angular2-jwt';

// App Modules
import { AboutModule } from './about/about.module';
import { ApiHelperModule } from './api-helper/api-helper.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CoreRoutes } from './core/core.routes';
import { HomeModule } from './home/home.module';
import { PostModule } from './post/post.module';
import { StyleGuideModule } from './style-guide/style-guide.module';
import { ToDoModule } from './to-do/to-do.module';

describe('App: AngularCliTest', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
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
        HttpModule,
        RouterTestingModule.withRoutes(CoreRoutes)
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        provideAuth({
          tokenName: 'auth_token'
        })
      ],
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Angular CLI Test'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.appTitle).toEqual('Angular CLI Test');
  }));
});
