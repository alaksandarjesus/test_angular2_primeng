import { Injectable } from '@angular/core';

@Injectable()
export class LogService {
  showError = {
    debug: true,
    error: true,
    info: true,
    log: true,
    warn: true
  };

  constructor() { }

  debug(title: string, error: any, isHandled = false) {
    if (this.showError.debug && !isHandled) {
      console.debug(title); // tslint:disable-line
    }
  }
  error(title: string, error: any, isHandled = false) {
    if (this.showError.error && !isHandled) console.error(this.getErrorObject(title, error)); // tslint:disable-line
  }
  info(title: string, error: any, isHandled = false) {
    if (this.showError.info && !isHandled) console.info(this.getErrorObject(title, error)); // tslint:disable-line
  }
  log(title: string, error: any, isHandled = false) {
    if (this.showError.log && !isHandled) console.log(this.getErrorObject(title, error)); // tslint:disable-line
  }
  warn(title: string, error: any, isHandled = false) {
    if (this.showError.warn && !isHandled) console.warn(this.getErrorObject(title, error)); // tslint:disable-line
  }

  private getErrorObject(title: string, error: any): Object {
    return {
      title: title,
      error: error
    };
  }
}
