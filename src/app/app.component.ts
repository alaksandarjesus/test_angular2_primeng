import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { EnvironmentService } from './core/config/environment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  appTitle: string;
  constructor(private titleService: Title, environmentService: EnvironmentService) {
    this.appTitle = environmentService.AppTitle;
    this.titleService.setTitle(this.appTitle);
  }
}
