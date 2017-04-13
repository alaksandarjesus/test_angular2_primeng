/* tslint:disable:no-unused-variable */
import { BaseRequestOptions, Http, HttpModule, Response, RequestMethod, ResponseOptions } from '@angular/http';
import { async, inject, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Router } from '@angular/router';

import { AuthHttp, provideAuth, tokenNotExpired } from 'angular2-jwt';

import { Auth } from './auth.model';
import { AuthService } from './auth.service';
import { AuthTestHelper } from '../auth-test-helper.spec';
import { EnvironmentService } from '../../../core/config/environment.service';
import { ErrorResponse } from '../../../core/error-response.model';

import * as jsrsasign from 'jsrsasign';

describe('AuthService', () => {
    let authService: AuthService;
    let environmentService: EnvironmentService;
    let mockBackend: MockBackend;
    let authTestHelper: AuthTestHelper;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
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

    beforeEach(async(() => {
        authTestHelper = new AuthTestHelper();
        environmentService = new EnvironmentService();

        mockBackend = getTestBed().get(MockBackend);
        mockBackend.connections.subscribe((mockConnection: MockConnection) => {
            let testData = {};
            let response = null;
            if (mockConnection.request.url.indexOf('/throw-error') !== -1) {
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

    it('constructor', () => {
        authTestHelper.injectToken(environmentService.AuthCredentials.clientSecret, environmentService.AuthCredentials.localStorageProperty);
        expect(authService).toBeDefined();
    });

    it('canActivate - invalid token', () => {
        authService.canActivate();
    });

    it('canActivate', () => {
        authTestHelper.injectToken(environmentService.AuthCredentials.clientSecret, environmentService.AuthCredentials.localStorageProperty);
        authService.canActivate();
    });

    it('logIn', () => {
        authTestHelper.injectToken(environmentService.AuthCredentials.clientSecret, environmentService.AuthCredentials.localStorageProperty);
        authService.logIn('name', 'password');
    });

    it('logIn - error handler', () => {
        authService.logIn('name', 'password');
    });

    it('logOut', () => {
        authService.logOut();
    });

    it('getAuth', () => {
        authService.getAuth();
    });

    it('getLocalStorageAuth', () => {
        authTestHelper.injectToken(environmentService.AuthCredentials.clientSecret, environmentService.AuthCredentials.localStorageProperty);
        authService.getLocalStorageAuth();
    });
});
