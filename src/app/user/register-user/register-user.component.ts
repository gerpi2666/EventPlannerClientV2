import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/services/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/services/notification.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  formulario: FormGroup;
  TitleForm: string = "Crear cuenta";
  UserInfo: any;
  Id: any;
  IsCreate: boolean = true;
  redirectUrl: string = '/login'; // Agregar esta propiedad
  showConfirmPassword: boolean = false; // Para controlar la visibilidad del campo confirmPassword

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private noti: NotificacionService
  ) {
    this.reactiveForm();
  }

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.id) {
      this.Id = currentUser.id;
      if (this.Id != null && !isNaN(Number(this.Id))) {
        this.redirectUrl = '/events-users';
        this.IsCreate = false;
        this.TitleForm = 'Actualizar cuenta';
        this.loadUserInfo(this.Id);
      }
    }
  }

  loadUserInfo(userId: number) {
    this.gService.get(`/getByIdP`, `?id=${userId}`).subscribe({
      next: (call) => {
        debugger
        this.UserInfo = call.data;
        this.formulario.setValue({
          id: this.UserInfo.id,

          Password: this.UserInfo.password,
          confirmPassword: this.UserInfo.password, // Inicializar con la misma contraseña para validación
          Email: this.UserInfo.email,
          ExpirationDate: this.formatDate(this.UserInfo.expirationDate),
          Rol: this.UserInfo.rol,
          NombreUsuario: this.UserInfo.nombreUsuario
        });
      },
      error: () => {
        this.noti.mensaje('Error', 'Error de conexion', TipoMessage.error);
      }
    });
  }

  reactiveForm() {
    this.formulario = this.fb.group({
      id: [null],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$') // Expresión regular para la contraseña
      ]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      ExpirationDate: [''],
      Rol: [''],
      NombreUsuario: ['', Validators.required]
    }, { validator: this.passwordMatchValidator }); // Aplicar validador personalizado
  }

  // Función para validar que las contraseñas coinciden
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('Password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value
      ? confirmPassword.setErrors({ passwordMismatch: true })
      : confirmPassword?.setErrors(null);
  }

  onPasswordFocus() {
    this.showConfirmPassword = true; // Mostrar campo de confirmar contraseña
  }

  submit() {
    if (this.formulario.invalid) {
      return;
    }
    const currentDate = new Date();
    const expirationDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
    const userData = {
      ...this.formulario.value,
      ExpirationDate: this.formatDate(expirationDate.toISOString()),
      Rol: this.formulario.value.Rol || 2 // Establecer un rol por defecto si no se proporciona uno
    };

    if (this.IsCreate) {
      this.gService.create('/create', userData).subscribe({
        next: (call) => {
          if (call.statusCode == 200) {
            this.noti.mensaje('Exito', 'Usuario creado correctamente', TipoMessage.success);
            this.router.navigate(['/users']);
          } else {
            this.handleError(call.statusCode);
          }
        },
        error: () => {
          this.noti.mensaje('Error', 'Error de conexion', TipoMessage.error);
        }
      });
    } else {
      this.gService.update('/update', this.formulario.value).subscribe({
        next: (call) => {
          if (call.statusCode == 200) {
            this.noti.mensaje('Exito', 'Usuario actualizado correctamente', TipoMessage.success);
            this.router.navigate(['/events-users']);
          } else {
            this.handleError(call.statusCode);
          }
        },
        error: () => {
          this.noti.mensaje('Error', 'Error de conexion', TipoMessage.error);
        }
      });
    }
  }

  handleError(statusCode: number) {
    if (statusCode == 400 || statusCode == 401) {
      this.noti.mensaje('Error', 'Usuario no encontrado', TipoMessage.warning);
    } else if (statusCode == 500) {
      this.noti.mensaje('Error', 'Error de conexion', TipoMessage.error);
    }
  }

  discard() {
    this.router.navigate(['/events-users']);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  errorHandling(control: string, error: string) {
    const formControl = this.formulario.get(control);
    return formControl?.touched && formControl?.hasError(error);
  }
}
