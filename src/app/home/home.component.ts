import { Component, OnInit } from '@angular/core';

import { EnvironmentService } from '../core/config/environment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  appTitle: string;
  constructor(environmentService: EnvironmentService) {
    this.appTitle = environmentService.AppTitle;
  }

  ngOnInit() {
  }
}
