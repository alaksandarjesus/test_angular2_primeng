import { Component } from '@angular/core';

import { EnvironmentService } from '../core/config/environment.service';

@Component({
  selector: 'app-style-guide',
  templateUrl: './style-guide.component.html',
  styleUrls: ['./style-guide.component.scss']
})
export class StyleGuideComponent {
  search: string = '';
  appTitle: string;
  constructor(environmentService: EnvironmentService) {
    this.appTitle = environmentService.AppTitle;
  }

  expandCollapse() {
    let collapseItems = document.querySelectorAll('.panel-heading > .collapse-link');
    for (let i = 0; i < collapseItems.length; i++) {
      let collapseItem = collapseItems[i] as any;
      (collapseItem as any).click();
    }
  }
}
