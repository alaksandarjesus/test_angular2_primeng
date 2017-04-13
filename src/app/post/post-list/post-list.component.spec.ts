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
import { ErrorResponse } from '../../core/error-response.model';
import { Post } from '../shared/post.model';
import { CoreModule } from '../../core/core.module';
import { PostListComponent } from '../post-list/post-list.component';
import { PostRoutes } from '../post.routes';
import { PostService } from '../shared/post.service';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let componentFixture: ComponentFixture<PostListComponent>;
  let mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        FormsModule,
        RouterTestingModule.withRoutes(PostRoutes)
      ],
      declarations: [
        PostListComponent,
      ],
      providers: [
        AuthService,
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
    componentFixture = TestBed.createComponent(PostListComponent);
    component = componentFixture.componentInstance;
    componentFixture.detectChanges();
    mockBackend.connections.subscribe((c: MockConnection) => {
      let testData = [
        {
          'id': 1,
          'name': 'Post 1 - dev1'
        },
        {
          'id': 2,
          'name': 'Post 2 - dev1'
        },
        {
          'id': 3,
          'name': 'Post 3 - dev1'
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

  it('getToDoList', () => {
    component.getPostList();
    expect(component.postList.length > 0).toEqual(true);
  });

  it('getPostList: error handler not 403', () => {
    component.postService.apiRoute.path = '/throw-error';
    component.getPostList();
    expect(component.postList.length).toEqual(0);
  });
});
