import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GenericService } from 'src/app/services/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/services/notification.service';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  formulario:any
  TitleForm:string= "Agregar Usuarios"
  UserInfo
  Id:any
  IsCreate: boolean = true;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private noti: NotificacionService,
  ) {
    this.reactiveForm();
  }

  ngOnInit(): void {
    
    this.activeRouter.params.subscribe((params: Params) => {
      this.Id = params['id'];
      console.log('ID', this.Id)
      if (this.Id != undefined && !isNaN(Number(this.Id))) {
        this.IsCreate = false;
        this.TitleForm = 'Actualizar Usuario';
        //call al api
        this.gService
        .get('/getById',`?id=${this.Id}`)
        .subscribe({
          next: (call) => {
            console.log('EDIT CALL', call)
            this.UserInfo=call.data
            console.log('UserInfo', this.UserInfo)
            this.formulario.setValue({
              Password: this.UserInfo.password,
              Email: this.UserInfo.email,
              ExpirationDate: this.UserInfo.expirationDate,
              Rol: this.UserInfo.rol,
              NombreUsuario: this.UserInfo.nombreUsuario,
           
            });
          },
          error: () => {
            this.noti.mensaje('Error', 'Error de conexion', TipoMessage.error);
          },
        });
  


      }
    });
  }


  reactiveForm(){
     this.formulario = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
      ExpirationDate: ['', Validators.required],
      Rol: ['', Validators.required],
      NombreUsuario: ['', Validators.required],
    });
  }

  submit(){
    if (this.IsCreate) {

      this.gService
        .create('/create', this.formulario.value)       
       .subscribe({
        next: (call) => {
          if (call.statusCode == 400 || call.statusCode == 401 ) {
            this.noti.mensaje(
              'Error',
              'Usuario no encontrado',
              TipoMessage.warning
            );
            return;
          }

          if (call.statusCode == 500) {
            this.noti.mensaje('Error', 'Error de conexion', TipoMessage.error);
            return;
          }

          if(call.statusCode==200){
            this.noti.mensaje(
              'Exito',
              'Usuario creado correctamente',
              TipoMessage.success
            );
            this.router.navigate(['/users']);
          }
        },
        error: () => {
          this.noti.mensaje('Error', 'Error de conexion', TipoMessage.error);
        },
      });


    } else {
      this.gService
        .update('/update', this.formulario.value)
        .subscribe((data: any) => {
          //Obtener respuesta
          console.log('CALLBACK API', data);
          this.noti.mensajeRedirect(
            'Actualizar Material',
            `Material Actualizado: ${data.Data}`,
            TipoMessage.success,
            '/Dash'
          );
          this.router.navigate(['/Dash/material']);
        });
    }
  }

  discard(){
    this.router.navigate(['/users']);

  }

  public errorHandling = (control: string, error: string) => {
    return this.formulario.controls[control].hasError(error);
  };
  
}
