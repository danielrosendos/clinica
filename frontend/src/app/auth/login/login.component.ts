import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { ServicesService } from '../../core/services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

  formLogin: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  checarSalvarLogin = false;
  esconderOuMostrarSenha = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private coreService: ServicesService
  ) { }

  ngOnInit(): void {
    const logged = this.authService.verificarSeEstaAutenticado();
    if (logged) { this.coreService.changeRouter('/consultas'); }
  }

  irParaPaginaDeRegistro() {
    this.coreService.changeRouter('/register');
  }

  enviarFormularioDeLogin() {
    const payload = this.formLogin.value;

    this.authService.logarUsuário(payload)
      .subscribe(
        () => {
          this.coreService.changeRouter('consultas');
          this.coreService.openToast('Usuário Logado Com Sucesso');
        },
        () => { this.coreService.openToast('Não foi possivel fazer login! Verifique se usuário e senha estão corretos', false); }
      );

  }
}

