/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LogService } from './log.service';

describe('LogService', () => {
    let logService: LogService = new LogService();

    it('should debug', () => {
        logService.showError.debug = true;
        logService.debug('test', {});
        logService.debug('test', {}, true);
        logService.showError.debug = false;
        logService.debug('test', {});
    });

    it('should error', () => {
        logService.showError.debug = true;
        logService.error('test', {});
        logService.error('test', {}, true);
        logService.showError.debug = false;
        logService.error('test', {});
    });

    it('should info', () => {
        logService.showError.debug = true;
        logService.info('test', {});
        logService.info('test', {}, true);
        logService.showError.debug = false;
        logService.info('test', {});
    });

    it('should log', () => {
        logService.showError.debug = true;
        logService.log('test', {});
        logService.log('test', {}, true);
        logService.showError.debug = false;
        logService.log('test', {});
    });

    it('should warn', () => {
        logService.showError.debug = true;
        logService.warn('test', {});
        logService.warn('test', {}, true);
        logService.showError.debug = false;
        logService.warn('test', {});
    });
});
