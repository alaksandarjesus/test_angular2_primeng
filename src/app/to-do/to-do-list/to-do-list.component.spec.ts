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
import { PostListComponent } from '../../post/post-list/post-list.component';
import { ToDo } from '../shared/to-do.model';
import { ToDoDetailsComponent } from '../to-do-details/to-do-details.component';
import { ToDoListComponent } from '../to-do-list/to-do-list.component';
import { ToDoRoutes } from '../to-do.routes';
import { ToDoService } from '../shared/to-do.service';

describe('ToDoListComponent', () => {
  let component: ToDoListComponent;
  let componentFixture: ComponentFixture<ToDoListComponent>;
  let authTestHelper: AuthTestHelper;
  let environmentService: EnvironmentService;
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
    mockBackend = mBackend;
    componentFixture = TestBed.createComponent(ToDoListComponent);
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
        if (c.request.url.indexOf('/403') !== -1) {
          response = new ErrorResponse(new ResponseOptions({
            body: {},
            status: 403
          }));
        } else {
          response = new ErrorResponse(new ResponseOptions({
            body: {},
            status: 404
          }));
        }
        c.mockError(response);
      } else {
        switch (c.request.method) {
          case RequestMethod.Get:
            requestJson = testData;
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

  it('ngOnInit', () => {
    spyOn(component, 'getToDoList');
    component.ngOnInit();
    expect(component.getToDoList).toHaveBeenCalled();
  });

  it('getToDoList', () => {
    component.getToDoList();
    expect(component.toDoList.length > 0).toEqual(true);
  });

  it('getToDoList: error handler 403', () => {
    component.toDoService.apiRoute.path = '/throw-error/403';
    component.getToDoList();
    expect(component.toDoList.length).toEqual(0);
  });

  it('getToDoList: error handler not 403', () => {
    component.toDoService.apiRoute.path = '/throw-error';
    component.getToDoList();
    expect(component.toDoList.length).toEqual(0);
  });

  it('addToDo', () => {
    authTestHelper.injectToken(environmentService.AuthCredentials.clientSecret, environmentService.AuthCredentials.localStorageProperty);
    component.addToDo();
    expect(component.error).toEqual(null);
    expect(component.addingToDo).toEqual(true);
    expect(component.selectedToDo).toEqual(null);
  });

  it('deleteToDo', () => {
    let testObject = {
      'id': 1,
      'name': 'TODO 1 - dev1',
      'createdById': 1,
      'createdBy': 'admin'
    };
    let testEvent = {
      stopPropagation: function () { }
    };
    component.getToDoList();
    let toDoListCount = component.toDoList.length;
    component.deleteToDo(testObject, testEvent);
    expect(component.toDoList.length < toDoListCount).toEqual(true);
    expect(component.selectedToDo).toEqual(null);
  });

  it('deleteToDo: error handler', () => {
    let testObject = {
      'id': 1,
      'name': 'TODO 1 - dev1',
      'createdById': 1,
      'createdBy': 'admin'
    };
    let testEvent = {
      stopPropagation: function () { }
    };
    component.selectedToDo = testObject;
    component.getToDoList();
    let toDoListCount = component.toDoList.length;
    component.toDoService.apiRoute.path = '/throw-error';
    component.deleteToDo(testObject, testEvent);
    expect(component.toDoList.length === toDoListCount).toEqual(true);
    expect(component.selectedToDo).not.toEqual(null);
  });

  it('close', () => {
    spyOn(component, 'getToDoList');
    let testObject = {
      'id': 1,
      'name': 'TODO 1 - dev1',
      'createdById': 1,
      'createdBy': 'admin'
    };
    component.close(testObject);
    expect(component.addingToDo).toEqual(false);
    expect(component.getToDoList).toHaveBeenCalled();
  });

  it('close: without updated ToDo', () => {
    spyOn(component, 'getToDoList');
    component.close(undefined);
    expect(component.addingToDo).toEqual(false);
    expect(component.getToDoList).not.toHaveBeenCalled();
  });

  it('gotoDetail', () => {
    spyOn(component.router, 'navigate');
    let testObject = {
      'id': 1,
      'name': 'TODO 1 - dev1',
      'createdById': 1,
      'createdBy': 'admin'
    };
    component.gotoDetail(testObject);
    expect(component.router.navigate).toHaveBeenCalled();
  });
});
