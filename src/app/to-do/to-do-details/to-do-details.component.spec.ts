/* tslint:disable:no-unused-variable */
import { BaseRequestOptions, Http, Response, RequestMethod, ResponseOptions } from '@angular/http';
import { inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable } from 'rxjs';
import { provideAuth, AuthHttp } from 'angular2-jwt';

import { AuthService } from '../../core/auth/shared/auth.service';
import { AuthTestHelper } from '../../core/auth/auth-test-helper.spec';
import { CoreModule } from '../../core/core.module';
import { EnvironmentService } from '../../core/config/environment.service';
import { ErrorResponse } from '../../core/error-response.model';
import { LogService } from '../../core/log.service';
import { PostListComponent } from '../../post/post-list/post-list.component';
import { ToDo } from '../shared/to-do.model';
import { ToDoDetailsComponent } from '../to-do-details/to-do-details.component';
import { ToDoListComponent } from '../to-do-list/to-do-list.component';
import { ToDoRoutes } from '../to-do.routes';
import { ToDoService } from '../shared/to-do.service';

describe('ToDoDetailsComponent', () => {
  let authTestHelper: AuthTestHelper;
  let component: ToDoDetailsComponent;
  let componentFixture: ComponentFixture<ToDoDetailsComponent>;
  let environmentService: EnvironmentService;
  let logService: LogService;
  let mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        FormsModule,
        RouterTestingModule.withRoutes(ToDoRoutes)
      ],
      declarations: [
        PostListComponent,
        ToDoDetailsComponent,
        ToDoListComponent
      ],
      providers: [
        AuthService,
        ToDoService,
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
        },
        {
          provide: AuthHttp,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(inject([MockBackend], (mBackend: MockBackend) => {
    authTestHelper = new AuthTestHelper();
    environmentService = new EnvironmentService();
    logService = new LogService();
    mockBackend = mBackend;
    componentFixture = TestBed.createComponent(ToDoDetailsComponent);
    component = componentFixture.componentInstance;
    componentFixture.detectChanges();
    mockBackend.connections.subscribe((c: MockConnection) => {
      let testData = [
        {
          'id': 1,
          'name': 'TODO 1 - dev1',
          'createdById': 1,
          'createdBy': 'admin'
        },
        {
          'id': 2,
          'name': 'TODO 2 - dev1',
          'createdById': 1,
          'createdBy': 'admin'
        },
        {
          'id': 3,
          'name': 'TODO 3 - dev1',
          'createdById': 2,
          'createdBy': 'editor'
        }
      ];
      let response = null;
      let requestJson = c.request.json();
      if (c.request.url.indexOf('/throw-error') !== -1) {
        response = new ErrorResponse(new ResponseOptions({
          body: {},
          status: 404
        }));
        c.mockError(response);
      } else {
        switch (c.request.method) {
          case RequestMethod.Get:
            requestJson = testData;
            if (c.request.url.split('/').splice(-1)[0] === '1') {
              requestJson = testData[0];
            }
            break;
          case RequestMethod.Post:
            requestJson.id = 999999;
            break;
        }
        response = new Response(new ResponseOptions({
          body: JSON.stringify(requestJson)
        }));
        c.mockRespond(response);
      }
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit: (with id) - ', () => {
    let params: Params[] = [];
    params.push({ id: 1 });
    component.route.params = Observable.from(Observable.from(params));
    component.ngOnInit();
    let testObject = {
      'id': 1,
      'name': 'TODO 1 - dev1',
      'createdById': 1,
      'createdBy': 'admin'
    };
    expect(component.toDo).toBeDefined();
    expect(component.isLoaded).toEqual(true);
    expect(component.toDo).toEqual(jasmine.objectContaining(testObject));
  });

  it('ngOnInit: (without id) - ', () => {
    component.ngOnInit();
    expect(component.toDo).toEqual(new ToDo());
  });

  it('ngOnInit: error handler', () => {
    let params: Params[] = [];
    params.push({ id: 1 });
    component.route.params = Observable.from(Observable.from(params));
    component.toDoService.apiRoute.path = '/throw-error';
    component.ngOnInit();
  });

  it('save: (with id)', () => {
    let params: Params[] = [];
    params.push({ id: 1 });
    component.toDo = {
      'id': 1,
      'name': 'TODO 1 - dev1',
      'createdById': 1,
      'createdBy': 'admin'
    };
    component.route.params = Observable.from(Observable.from(params));
    component.toDoService.apiRoute.path = '/throw-error';
    component.save();
  });

  it('save: (without id)', () => {
    let testObject = {
      'id': null,
      'name': 'TODO 1 - dev1',
      'createdById': 1,
      'createdBy': 'admin'
    };
    component.toDo = testObject;
    component.toDoService.authService.auth.next({ id: 'test', userName: '', displayName: '', description: '', role: '' });
    component.save();
    expect(component.toDo).toEqual(jasmine.objectContaining(testObject));
  });

  it('save: error handler', () => {
    component.toDoService.apiRoute.path = '/throw-error';
    component.error = '';
    component.save();
  });

  it('goBack', () => {
    spyOn(component.router, 'navigate');
    spyOn(component.close, 'emit');
    component.goBack();
    expect(component.router.navigate).toHaveBeenCalled();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('handle errors', () => {
    let error = {
      constructor: {
        name: 'AuthHttpError'
      },
      status: 0
    };
    component.toDoService.handleError(error, logService);

    error.constructor.name = 'NotAuthHttpError';
    component.toDoService.handleError(error, logService);

    let testError1 = {
      constructor: {
        foo: 'test'
      }
    };
    component.toDoService.handleError(testError1, logService);

    let testError2 = {
      constructor: {
        foo: 'test'
      },
      status: 403
    };
    component.toDoService.handleError(testError2, logService);
  });
});
