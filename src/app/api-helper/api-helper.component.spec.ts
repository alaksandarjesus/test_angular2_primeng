/* tslint:disable:no-unused-variable */
import { inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseRequestOptions, Http, HttpModule, Response, RequestMethod, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { provideAuth, AuthHttp } from 'angular2-jwt';

import { ApiHelperComponent } from './api-helper.component';
import { ApiHelperRoutes } from './api-helper.routes';
import { AuthService } from '../core/auth/shared/auth.service';
import { CoreModule } from '../core/core.module';
import { ErrorResponse } from '../core/error-response.model';
import { PostService } from '../post/shared/post.service';
import { ToDoService } from '../to-do/shared/to-do.service';

describe('ApiHelperComponent', () => {
  let component: ApiHelperComponent;
  let componentFixture: ComponentFixture<ApiHelperComponent>;
  let mockBackend: MockBackend;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        CoreModule,
        FormsModule,
        HttpModule,
        RouterTestingModule.withRoutes(ApiHelperRoutes)
      ],
      declarations: [ApiHelperComponent],
      providers: [
        AuthService,
        ToDoService,
        PostService,
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
    mockBackend = mBackend;
    componentFixture = TestBed.createComponent(ApiHelperComponent);
    component = componentFixture.componentInstance;
    componentFixture.detectChanges();
    mockBackend.connections.subscribe((c: MockConnection) => {
      let testData = [
        {
          'id': 1,
          'name': 'Test 1'
        },
        {
          'id': 2,
          'name': 'Test 2'
        },
        {
          'id': 3,
          'name': 'Test 3'
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

  it('create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit: get called, serviceInfoList populated', () => {
    spyOn(component, 'get');
    component.serviceInfoList = [];
    component.ngOnInit();
    expect(component.get).toHaveBeenCalled();
    expect(component.serviceInfoList.length === 2).toEqual(true);
  });

  it('get: results returned, matches model', () => {
    component.get(component.serviceInfoList[0]);
    let testObject = {
      id: 1,
      name: 'Test 1'
    };
    expect(component.results[0]).toEqual(jasmine.objectContaining(testObject));
    expect(component.results.length > 0).toEqual(true);
  });

  it('get: error handling', () => {
    component.get(component.serviceInfoList[0]);
    let service = Object.assign({}, component.serviceInfoList[0]);
    service.service.apiRoute.path = '/throw-error';
    component.get(service);
  });

  it('getId', () => {
    let service = Object.assign({}, component.serviceInfoList[0]);
    service.id = 1;
    component.get(service);
    expect(component.results.length === 1).toEqual(true);
  });

  it('getId: error handling', () => {
    let service = Object.assign({}, component.serviceInfoList[0]);
    service.id = 1;
    service.service.apiRoute.path = '/throw-error';
    component.get(service);
  });

  it('add: id updated, results updated, results increased', () => {
    let currentCount = component.results.length;
    let testObject = { id: null, name: 'Foo 123' };
    component.add(testObject);
    expect(component.results.slice(-1)[0].id).not.toEqual(testObject.id);
    testObject.id = component.results.slice(-1)[0].id;
    expect(component.results[component.results.length - 1]).toEqual(jasmine.objectContaining(testObject));
    expect(component.results.length === currentCount + 1).toEqual(true);
  });

  it('add: error handling', () => {
    let service = Object.assign({}, component.serviceInfoList[0]);
    service.service.apiRoute.path = '/throw-error';
    component.get(service);
    component.add({});
  });

  it('update', () => {
    component.get(component.serviceInfoList[0]);
    let updatedPost = component.results[component.results.length - 1];
    updatedPost.name = 'Update name';
    component.update(updatedPost);
    expect(component.results[component.results.length - 1]).toEqual(jasmine.objectContaining(updatedPost));
  });

  it('update: error handling', () => {
    let service = Object.assign({}, component.serviceInfoList[0]);
    service.service.apiRoute.path = '/throw-error';
    component.get(service);
    component.update({});
  });

  it('remove: results updated, results decreased', () => {
    component.get(component.serviceInfoList[0]);
    let currentCount = component.results.length;
    let postToRemove = component.results[0];
    component.remove(postToRemove);
    expect(component.results[0]).not.toEqual(jasmine.objectContaining(postToRemove));
    expect(component.results.length === currentCount - 1).toEqual(true);
  });

  it('remove: error handling', () => {
    let service = Object.assign({}, component.serviceInfoList[0]);
    service.service.apiRoute.path = '/throw-error';
    component.get(service);
    component.remove({});
  });
});
