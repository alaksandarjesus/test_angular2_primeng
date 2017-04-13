import { Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class EnvironmentService {
  public readonly AppTitle = 'Angular CLI Starter';

  public readonly RouteAuthType = {
    anonymous: 'anonymous',
    secure: 'secure'
  };

  public readonly AuthCredentials = {
    localStorageProperty: 'auth_token',
    clientId: 'dev-api-web-id',
    clientSecret: 'dev-api-web-secret'
  };

  public readonly ApiConfig = {
    auth: {
      path: environment.apiBasePath + 'auth/get-token',
      authType: this.RouteAuthType.anonymous,
    },    
    post: {
      path: environment.apiBasePath + 'post',
      authType: this.RouteAuthType.anonymous,
    },
    toDo: {
      path: environment.apiBasePath + 'to-do',
      authType: this.RouteAuthType.secure,
    },
    user: {
      path: environment.apiBasePath + 'user',
      authType: this.RouteAuthType.anonymous,
    },
    userSecurity: {
      path: environment.apiBasePath + 'user-security',
      authType: this.RouteAuthType.anonymous,
    }
  };

  public getHeaderConstants(): Headers {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  getAuthHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'am9obmQ6cEBzc3dvcmQx');
    return headers;
  }

  getBaseUrl() {
    return this.isMobile() ? environment.apiBasePath : '';
  }

  isMobile() {
    // TODO: (jlivingston@seamgen.com) Find more fool-proof way to determine if on mobile or not. (jlivingston@seamgen.com)
    return navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/) !== null;
  }

  urlEncode(obj: Object): string {
    let urlSearchParams = new URLSearchParams();
    for (let i = 0; i < Object.keys(obj).length; i++) {
      urlSearchParams.append(Object.keys(obj)[i], obj[Object.keys(obj)[i]]);
    }
    return urlSearchParams.toString();
  }
}
