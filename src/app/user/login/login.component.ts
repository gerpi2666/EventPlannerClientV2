import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GenericService } from 'src/app/services/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/services/notification.service';
import { Call } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  formulario: FormGroup;
  makeSubmit: boolean = false;
  infoUsuario: any;
  currentUser: any;
  isCheck:any

  constructor(
    public fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private noti: NotificacionService
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.logout();
  }

  onReset() {
    
    this.formulario.reset();
  }

  submitForm() {
    this.makeSubmit = true;
    // Validación
    if (this.formulario.invalid) {
      return;
    }

    this.gService
      .create('/login', this.formulario.value)
      .subscribe({
        next: (call) => {
          this.isCheck=call;
          console.log('ischeck', this.isCheck)
         

          if (call.statusCode == 400 || call.statusCode == 401) {

            this.noti.mensaje(
              'Error',
              'Credenciales incorrectas',
              TipoMessage.warning
            );
            return;
          }

          if (call.statusCode == 500) {
            this.noti.mensaje('Error', 'Error de conexion', TipoMessage.error);
            return;
          }

          if (call.statusCode == 200) {
            console.log('DATOS  call: ' ,  call);
            localStorage.setItem('currentUser', JSON.stringify(call.data));
          
         

            this.noti.mensaje(
              'Exito',
              'Credenciales Correctas',
              TipoMessage.success
            );
            if(call.data.rol==2){
              this.router.navigate(['/events-users']);

            }else{
              this.router.navigate(['/Dash']);

            }
          }
        },
        error: () => {
          this.noti.mensaje('Error', 'Error de conexion', TipoMessage.error);
        },
      });

    console.log('Data login', this.formulario.value);
  }

  register() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      IdCupon: 1,
    };
    //this.dialog.open(RegisterComponent, dialogConfig);
  }

  public errorHandling = (control: string, error: string) => {
    return this.formulario.controls[control].hasError(error);
  };

  logout() {
    // Elimina la información del usuario actual de localStorage o cualquier otro almacenamiento
    localStorage.removeItem('currentUser');
  }
}
