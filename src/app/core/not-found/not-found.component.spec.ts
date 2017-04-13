/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { provideAuth, AuthHttp } from 'angular2-jwt';

import { AuthService } from '../auth/shared/auth.service';
import { CoreRoutes } from '../core.routes';
import { EnvironmentService } from '../config/environment.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { LogInComponent } from '../auth/log-in.component';
import { LogService } from '../log.service';
import { NotFoundComponent } from '../not-found/not-found.component';
import { SiteMapComponent } from '../site-map/site-map.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpModule,
        RouterTestingModule.withRoutes(CoreRoutes)
      ],
      declarations: [
        LogInComponent,
        SiteMapComponent,
        FooterComponent,
        HeaderComponent,
        NotFoundComponent
      ],
      providers: [
        AuthService,
        EnvironmentService,
        LogService,
        provideAuth({
          tokenName: 'auth_token'
        })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
