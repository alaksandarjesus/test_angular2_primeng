import { Component } from '@angular/core';

import { Auth } from '../../core/auth/shared/auth.model';
import { AuthService } from '../../core/auth/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  logInIsVisible: boolean;
  auth: Auth = undefined;

  constructor(public authService: AuthService) {
    this.auth = authService.auth.getValue();
    authService.$auth.subscribe(
        response => {
          this.auth = response;
        }
    );
  }

  showLogIn(): void {
    this.logInIsVisible = true;
  }

  logOut(): void {
    this.authService.logOut();
  }
}
