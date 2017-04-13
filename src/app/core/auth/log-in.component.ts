import { Component, Input } from '@angular/core';

import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html'
})
export class LogInComponent {
  @Input() isLoggedIn: boolean = false;
  error: any;

  constructor(private authService: AuthService) { }

  logIn(event, userName, password) {
    event.preventDefault();
    this.authService.logIn(userName, password).subscribe(
      () => {
        this.isLoggedIn = true;
        $('#login-modal').modal('hide');
      },
      error => {
        this.isLoggedIn = true;
        this.error = error;
      }
    );
  }
}
