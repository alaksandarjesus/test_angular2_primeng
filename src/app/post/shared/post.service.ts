import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';

import { AuthService } from '../../core/auth/shared/auth.service';
import { EnvironmentService } from '../../core/config/environment.service';
import { LogService } from '../../core/log/log.service';
import { RestApiBase } from '../../core/api/rest-api.base';

@Injectable()
export class PostService extends RestApiBase {
  constructor(http: Http, authHttp: AuthHttp, authService: AuthService, logService: LogService, environmentService: EnvironmentService) {
    super(http, authHttp, authService, environmentService, logService, environmentService.ApiConfig.post);
  }
}
