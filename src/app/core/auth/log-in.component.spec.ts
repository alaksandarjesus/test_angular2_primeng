/* tslint:disable:no-unused-variable */
import { async, inject, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, RequestMethod, ResponseOptions } from '@angular/http';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import * as jsrsasign from 'jsrsasign';
import { provideAuth, AuthHttp } from 'angular2-jwt';

import { AuthService } from '../auth/shared/auth.service';
import { AuthTestHelper } from './auth-test-helper.spec';
import { CoreRoutes } from '../core.routes';
import { EnvironmentService } from '../config/environment.service';
import { ErrorResponse } from '../../core/error-response.model';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { LogInComponent } from './log-in.component';
import { LogService } from '../log.service';
import { NotFoundComponent } from '../not-found/not-found.component';
import { SiteMapComponent } from '../site-map/site-map.component';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let componentFixture: ComponentFixture<LogInComponent>;
  let authService: AuthService;
  let environmentService: EnvironmentService;
  let mockBackend: MockBackend;
  let authTestHelper: AuthTestHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpModule
      ],
      declarations: [
        LogInComponent
      ],
      providers: [
        AuthService,
        EnvironmentService,
        MockBackend,
        BaseRequestOptions,
        provideAuth({
          tokenName: 'auth_token'
        }),
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    }).compileComponents();
  });

  beforeEach(inject([MockBackend], (mBackend: MockBackend) => {
    authTestHelper = new AuthTestHelper();
    environmentService = new EnvironmentService();
    mockBackend = mBackend;
    componentFixture = TestBed.createComponent(LogInComponent);
    component = componentFixture.componentInstance;
    componentFixture.detectChanges();

    mockBackend.connections.subscribe((mockConnection: MockConnection) => {
      let testData = {};
      let response = null;
      if (mockConnection.request.text().indexOf('throw-error') !== -1) {
        response = new ErrorResponse(new ResponseOptions({
          body: {},
          status: 404
        }));
        mockConnection.mockError(response);
      } else {
        environmentService = new EnvironmentService();
        let obj = {};
        obj[environmentService.AuthCredentials.localStorageProperty] = authTestHelper.getToken(environmentService.AuthCredentials.clientSecret);
        response = new Response(new ResponseOptions({
          body: JSON.stringify(obj)
        }));
        mockConnection.mockRespond(response);
      }
    });

    authService = getTestBed().get(AuthService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login', () => {
    authTestHelper.injectToken(environmentService.AuthCredentials.clientSecret, environmentService.AuthCredentials.localStorageProperty);
    component.logIn({ preventDefault: function () { } }, 'name', 'password');
  });

  it('should login - error handler', () => {
    component.logIn({ preventDefault: function () { } }, 'throw-error', 'throw-rror');
  });
});
