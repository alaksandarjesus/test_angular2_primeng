/* tslint:disable:no-unused-variable  */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EnvironmentService } from './environment.service';

describe('EnvironmentService', () => {
    let environmentService: EnvironmentService = new EnvironmentService();

    it('should getHeaderConstants', () => {
        let headers = environmentService.getHeaderConstants();
        expect(headers.getAll.length).toEqual(1);
    });

    it('should getAuthHeaders', () => {
        let headers = environmentService.getAuthHeaders();
        expect(headers.getAll.length).toEqual(1);
    });

    it('should return string getBaseUrl', () => {
        expect(environmentService.getBaseUrl()).toEqual('');
    });

    it('should not be mobile', () => {
        expect(environmentService.isMobile()).toEqual(false);
    });

    it('should urlEncode', () => {
        let encodedUrl = environmentService.urlEncode({ foo: 'foo' });
        expect(encodedUrl).not.toEqual('');
    });
});
