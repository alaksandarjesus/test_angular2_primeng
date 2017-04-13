import { Component, OnInit } from '@angular/core';

import { EnvironmentService } from '../config/environment.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  appTitle: string;
  constructor(environmentService: EnvironmentService) {
    this.appTitle = environmentService.AppTitle;
  }

  ngOnInit() {
  }
}
