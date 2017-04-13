import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs';

import { AuthService } from '../../core/auth/shared/auth.service';
import { EnvironmentService } from '../../core/config/environment.service';
import { LogService } from '../../core/log/log.service';
import { RestApiInterface } from './rest-api.interface';

@Injectable()
export class RestApiBase implements RestApiInterface {
  private httpType: Http | AuthHttp;
  constructor(
    private http: Http,
    private authHttp: AuthHttp,
    public authService: AuthService,
    private environmentService: EnvironmentService,
    private logService: LogService,
    public apiConfig: any
  ) {
    this.httpType = (this.apiConfig.authType === this.environmentService.RouteAuthType.anonymous) ? this.http : this.authHttp;
  }

  get(): Observable<any[]> {
    return this.httpType
      .get(this.apiConfig.path)
      .map((response) => response.json() as any[])
      .catch(error => this.handleError(error, this.logService));
  }

  getById(id: number): Observable<any> {
    return this.httpType
      .get(`${this.apiConfig.path}/${id}`)
      .map((response) => response.json() as any)
      .catch(error => this.handleError(error, this.logService));
  }

  add(item: any): Observable<any> {
    if (this.authService.auth.value) {
      item['createdById'] = this.authService.auth.value.id;
      item['createdBy'] = this.authService.auth.value.userName;
      item['createdDate'] = new Date();
      item['modifiedById'] = this.authService.auth.value.id;
      item['modifiedBy'] = this.authService.auth.value.userName;
      item['modifiedDate'] = new Date();
    } else {
      // HACK
      item['createdById'] = 1;
      item['createdBy'] = 'admin';
      item['createdDate'] = new Date();
      item['modifiedById'] = 1;
      item['modifiedBy'] = 'admin';
      item['modifiedDate'] = new Date();
    }
    return this.httpType
      .post(this.apiConfig.path, JSON.stringify(item), { headers: this.environmentService.getHeaderConstants() })
      .map((response) => response.json() as any)
      .catch(error => this.handleError(error, this.logService));
  }

  update(item: any): Observable<any> {
    if (this.authService.auth.value) {
      item['modifiedById'] = this.authService.auth.value.id;
      item['modifiedBy'] = this.authService.auth.value.userName;
      item['modifiedDate'] = new Date();
    } else {
      // HACK
      item['modifiedById'] = 1;
      item['modifiedBy'] = 'admin';
      item['modifiedDate'] = new Date();
    }
    return this.httpType
      .put(`${this.apiConfig.path}/${item.id}`, JSON.stringify(item), { headers: this.environmentService.getHeaderConstants() })
      .map((response) => response.json() as any)
      .catch(error => this.handleError(error, this.logService));
  }

  remove(item: any): Observable<Response> {
    return this.httpType
      .delete(`${this.apiConfig.path}/${item.id}`, { headers: this.environmentService.getHeaderConstants() })
      .map((response) => response.json() as any)
      .catch(error => this.handleError(error, this.logService));
  }

  handleError(error: any, logService: LogService) {
    // TODO: (jlivingston@seamgen.com) Why do we have to pass LogService? 'this' is null otherwise.
    // Need to clean this up a bit.
    let authHttpError = error.constructor.name ? error.constructor.name === 'AuthHttpError' : false;
    let status = error.status || (authHttpError ? 403 : 500);
    let message = error.status ? error.text() :
      (status === 403
        ? 'You have not logged in or do not have sufficient permissions. Please login or contact an administrator.'
        : 'An unknown network error has occurred. Please try again.');
    if (authHttpError && this.authService.auth.value !== null) {
      this.authService.logOut();
    }
    logService.error(message, error, true);
    return Observable.throw({ status: status, message: message });
  }
}
