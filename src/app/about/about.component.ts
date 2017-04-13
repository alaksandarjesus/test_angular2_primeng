import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from 'primeng/primeng';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
  val:any;
  constructor() { 
    this.val = 25;

  }

  ngOnInit() {
  }
}
