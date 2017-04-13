import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { EnvironmentService } from '../../../core/config/environment.service';
import { Auth } from './auth.model';

@Injectable()
export class AuthService implements CanActivate {
    auth = new BehaviorSubject<Auth>(undefined);
    $auth = this.auth.asObservable();

    constructor(
        public http: Http,
        public environmentService: EnvironmentService) {
        this.environmentService = new EnvironmentService();
        this.auth.next(this.getLocalStorageAuth());
    }

    canActivate() {
        if (tokenNotExpired(localStorage.getItem(this.environmentService.AuthCredentials.localStorageProperty))) {
            return true;
        }
        return false;
    }

    logIn(userName: string, password?: string, pin?: string): Observable<any> {
        let data: any = {
            client_id: this.environmentService.AuthCredentials.clientId,
            client_secret: this.environmentService.AuthCredentials.clientSecret,
            userName: userName,
            grant_type: 'password'
        };
        if (password !== null) {
            data.password = password;
        } else {
            data.pin = pin;
        }
        let body = this.environmentService.urlEncode(data);
        let oAuthPath = this.environmentService.ApiConfig.auth.path;
        return this.http
            .post(oAuthPath, body, { headers: this.environmentService.getAuthHeaders() })
            .map((response) => {
                let token = response.json()[this.environmentService.AuthCredentials.localStorageProperty];
                let auth = this.getDecodedToken(token);
                localStorage.setItem(this.environmentService.AuthCredentials.localStorageProperty, token);
                this.auth.next(auth);
            })
            .catch(error => {
                throw error.text();
            });
    }

    logOut() {
        localStorage.removeItem(this.environmentService.AuthCredentials.localStorageProperty);
        this.auth.next(null);
    }

    getAuth() {
        return this.auth.value;
    }

    getLocalStorageAuth(): Auth {
        let token = localStorage.getItem(this.environmentService.AuthCredentials.localStorageProperty);
        return token ? this.getDecodedToken(token) : undefined;
    }

    private getDecodedToken(token): Auth {
        let jwtHelper = new JwtHelper();
        let decodedToken = jwtHelper.decodeToken(token);
        return {
            id: decodedToken.user.id,
            userName: decodedToken.user.userName,
            roleDescription: decodedToken.user.roleDescription,
            role: decodedToken.user.role
        };
    }
}
