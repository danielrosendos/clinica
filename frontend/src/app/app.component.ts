import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title: 'Medicar';
  showFiller = true;
  isAuthenticated: boolean;

  constructor(
    private authService: AuthService
  ) {
    this.authService.getUser().subscribe(res => { this.isAuthenticated = this.authService.getToken(); });
  }
}
