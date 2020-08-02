import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ServicesService } from '../../core/services.service';
import { AuthService } from '../services/auth.service';
import { User } from '../ models/main';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hidePass = false;
  hideConfirmPass = false;

  formRegister = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  }, { Validators: this.verificarSeAsSenhasSaoIguais });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private coreService: ServicesService
  ) { }

  ngOnInit(): void {
  }

  enviarFormulario() {
    const payload: User = {
      ...this.formRegister.value,
      password: this.formRegister.value.password
    };
    this.authService
      .registrarUsuario(payload)
      .subscribe(
        (success) => {
          this.coreService.openToast('Usuário criado com sucesso');
          this.coreService.changeRouter('/login');
        },
        (err) => { this.coreService.openToast('Erro ao cadastrar usuário! Verifique os dados informados', true); }
      );
  }

  irParaTelaDeLogin() {
    this.coreService.changeRouter('/login');
  }

  verificarSeAsSenhasSaoIguais(group: FormGroup) {
    const password = group.controls.password.value;
    const confirmpassword = group.controls.password.value;

    return password === confirmpassword ? null : { mismatch: true };
  }

}
