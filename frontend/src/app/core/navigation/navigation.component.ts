import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/services/auth.service';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  navOptions: object;
  staffOptions: object = null;
  showFiller = false;

  constructor(
    private authService: AuthService,
    private coreService: ServicesService

  ) { }

  selectPage(item) {
    this.coreService.changeRouter(item.ref);
  }

  ngOnInit(): void {
    this.defineNavOptions();
  }

  defineNavOptions() {
    this.navOptions = [
      { name: 'Marcar consulta', icon: 'library_books', ref: 'marcar-consultas' },
      { name: 'Minhas Consultas', icon: 'access_alarms', ref: 'consultas' },
    ];
  }

  logOut() {
    if (confirm('Tem certeza que deseja encerrar a sessão?')) {
      const logout = this.authService.deslogarUsuario();
      logout.subscribe(
        (res) => { this.coreService.openToast('Deslogado com sucesso!'); },
        (err) => { console.log(err); }
      );
      this.coreService.changeRouter('/login');
    }
  }

  isStaff() {
    const user = this.authService.getClientData();
    if (user.hasOwnProperty('is_staff')) {
      return user.is_staff;
    } else {
      return false;
    }
  }

}
