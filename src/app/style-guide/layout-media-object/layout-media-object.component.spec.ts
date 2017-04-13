/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StyleGuideLayoutMediaObjectComponent } from './layout-media-object.component';

describe('StyleGuideLayoutMediaObjectComponent', () => {
  let component: StyleGuideLayoutMediaObjectComponent;
  let fixture: ComponentFixture<StyleGuideLayoutMediaObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyleGuideLayoutMediaObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleGuideLayoutMediaObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
