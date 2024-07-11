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
  IsCreate: boolean

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private notify: NotificacionService,
  ) {
    this.reactiveForm();
  }

  ngOnInit(): void {
    debugger
    this.activeRouter.params.subscribe((params: Params) => {
      this.Id = params['Id'];
      if (this.Id != undefined && !isNaN(Number(this.Id))) {
        this.IsCreate = false;
        this.TitleForm = 'Actualizar Usuario';
        //call al api
        this.gService
        .get('/getById',this.Id)
        .subscribe({
          next: (call) => {
            
            this.UserInfo=call.Data
            console.log('UserInfo', this.UserInfo)
  
          },
          error: () => {
            this.notify.mensaje('Error', 'Error de conexion', TipoMessage.error);
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

  }

  discard(){

  }

  public errorHandling = (control: string, error: string) => {
    return this.formulario.controls[control].hasError(error);
  };
  
}
