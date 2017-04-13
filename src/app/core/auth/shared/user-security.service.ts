import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';

import { AuthService } from './auth.service';
import { EnvironmentService } from '../../config/environment.service';
import { LogService } from '../../../core/log/log.service';
import { RestApiBase } from '../../api/rest-api.base';

@Injectable()
export class UserSecurityService extends RestApiBase {
  constructor(http: Http, authHttp: AuthHttp, authService: AuthService, logService: LogService, environmentService: EnvironmentService) {
    super(http, authHttp, authService, environmentService, logService, environmentService.ApiConfig.userSecurity);
  }
}
