import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/services/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/services/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  formulario: FormGroup;
  makeSubmit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private noti: NotificacionService
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$') // Expresión regular para la contraseña
      ]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    }, { validator: this.passwordMatchValidator });

    // Escuchar cambios en los campos newPassword y confirmPassword para activar la validación
    this.formulario.get('newPassword').valueChanges.subscribe(() => {
      this.formulario.get('confirmPassword').updateValueAndValidity();
    });
    this.formulario.get('confirmPassword').valueChanges.subscribe(() => {
      this.formulario.get('confirmPassword').updateValueAndValidity();
    });
  }

  ngOnInit(): void {}

  submitForm() {
    this.makeSubmit = true;
    if (this.formulario.invalid) {
      return;
    }

    const { email, newPassword } = this.formulario.value;
    this.gService
      .resetPassword(email, newPassword)
      .subscribe({
        next: (response) => {
          console.log('responseAPI',response)
          if(response.statusCode==200){
            this.noti.mensaje(
              'Éxito',
              'Contraseña restablecida correctamente',
              TipoMessage.success
            );
            this.router.navigate(['/login']);
          }
          
          if(response.statusCode==400){
            this.noti.mensaje(
              'Error',
              'Correo electronico invalido',
              TipoMessage.warning
            );
           return
          }
        
        },
        error: (error) => {
          console.log(error);
          this.noti.mensaje(
            'Error',
            'Error al restablecer la contraseña',
            TipoMessage.error
          );
        }
      });
  }

  validateField(field: string) {
    const control = this.formulario.get(field);
    if (control && control.touched) {
      control.updateValueAndValidity();
    }
  }

  errorHandling(control: string, error: string) {
    const formControl = this.formulario.get(control);
    return formControl?.touched && formControl?.hasError(error);
  }

  passwordMatchValidator(control: AbstractControl) {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    if (!newPassword || !confirmPassword) {
      return null;
    }

    if (confirmPassword.errors && !confirmPassword.errors['passwordMismatch']) {
      // Si otro validador ha encontrado un error en confirmPassword, no sobrescribir ese error
      return null;
    }

    if (newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword.setErrors(null);
    }

    return null;
  }
}
