import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-identidade',
  templateUrl: './identidade.component.html',
  styleUrls: ['./identidade.component.css']
})
export class IdentidadeComponent implements OnInit {

  logo = '/assets/images/indentidade-do-site/logo.png';
  companyName = 'Medicar';
  showLogo = true;

  constructor() { }

  ngOnInit(): void {
  }

}
