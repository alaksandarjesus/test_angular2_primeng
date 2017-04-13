/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EnvironmentService } from '../core/config/environment.service';
import { StyleGuideAlertsComponent } from './alerts/alerts.component';
import { StyleGuideBreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { StyleGuideButtonGroupComponent } from './button-group/button-group.component';
import { StyleGuideButtonsComponent } from './buttons/buttons.component';
import { StyleGuideCardComponent } from './card/card.component';
import { StyleGuideCarouselComponent } from './carousel/carousel.component';
import { StyleGuideCollapseComponent } from './collapse/collapse.component';
import { StyleGuideComponent } from './style-guide.component';
import { StyleGuideContentFiguresComponent } from './content-figures/content-figures.component';
import { StyleGuideContentImagesComponent } from './content-images/content-images.component';
import { StyleGuideContentTablesComponent } from './content-tables/content-tables.component';
import { StyleGuideContentTypographyComponent } from './content-typography/content-typography.component';
import { StyleGuideDropdownsComponent } from './dropdowns/dropdowns.component';
import { StyleGuideFormsComponent } from './forms/forms.component';
import { StyleGuideInputGroupComponent } from './input-group/input-group.component';
import { StyleGuideJumbotronComponent } from './jumbotron/jumbotron.component';
import { StyleGuideLayoutGridComponent } from './layout-grid/layout-grid.component';
import { StyleGuideLayoutMediaObjectComponent } from './layout-media-object/layout-media-object.component';
import { StyleGuideListGroupComponent } from './list-group/list-group.component';
import { StyleGuideModalComponent } from './modal/modal.component';
import { StyleGuideNavBarComponent } from './nav-bar/nav-bar.component';
import { StyleGuideNavsComponent } from './navs/navs.component';
import { StyleGuidePaginationComponent } from './pagination/pagination.component';
import { StyleGuidePopoversComponent } from './popovers/popovers.component';
import { StyleGuideProgressComponent } from './progress/progress.component';
import { StyleGuideRoutes } from './style-guide.routes';
import { StyleGuideTagComponent } from './tag/tag.component';
import { StyleGuideTooltipsComponent } from './tooltips/tooltips.component';

describe('StyleGuideComponent', () => {
  let component: StyleGuideComponent;
  let fixture: ComponentFixture<StyleGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
      ],
      declarations: [
        StyleGuideComponent,
        StyleGuideAlertsComponent,
        StyleGuideBreadcrumbComponent,
        StyleGuideButtonGroupComponent,
        StyleGuideButtonsComponent,
        StyleGuideCardComponent,
        StyleGuideCarouselComponent,
        StyleGuideCollapseComponent,
        StyleGuideContentFiguresComponent,
        StyleGuideContentImagesComponent,
        StyleGuideContentTablesComponent,
        StyleGuideContentTypographyComponent,
        StyleGuideDropdownsComponent,
        StyleGuideFormsComponent,
        StyleGuideInputGroupComponent,
        StyleGuideJumbotronComponent,
        StyleGuideLayoutGridComponent,
        StyleGuideLayoutMediaObjectComponent,
        StyleGuideListGroupComponent,
        StyleGuideModalComponent,
        StyleGuideNavBarComponent,
        StyleGuideNavsComponent,
        StyleGuidePaginationComponent,
        StyleGuidePopoversComponent,
        StyleGuideProgressComponent,
        StyleGuideTagComponent,
        StyleGuideTooltipsComponent
      ],
      providers: [ EnvironmentService ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
