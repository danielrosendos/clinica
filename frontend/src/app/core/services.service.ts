import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  openToast(text: string, isError: boolean = false): void {
    this.snackBar.open(
      text,
      'X',
      {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: isError ? ['msg-error'] : ['msg-success']
      });
  }

  changeRouter(text: string): void {
    this.router.navigateByUrl(text);
  }

}
