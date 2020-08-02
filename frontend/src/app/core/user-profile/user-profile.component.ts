import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userData: any;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getUsuerData();
  }
  getUsuerData() {
    this.userData = this.stylingUserParameters(this.authService.getClientData());
  }

  stylingUserParameters(data) {
    if (typeof data.email && typeof data.is_staff) {
      if (data.email === '') {
        data.email = 'Email não informado';
      }
      data.is_staff = (data.is_staff) ? 'Administrador' : 'Cliente';
    }
    return data;
  }
}
