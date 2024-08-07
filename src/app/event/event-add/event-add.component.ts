import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GenericService } from '../../services/generic.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/services/notification.service';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventListComponent } from '../event-list/event-list.component';


@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss']
})
export class EventAddComponent implements OnInit {
  
  eventForm: FormGroup;
  previewImage:any;
  submitted:boolean;
  Id:any
  IsCreate: boolean = true;
  TitleForm:string= "Agregar Eventos"
  EventInfo:any

  constructor(
    private fb: FormBuilder,
    private eventService: GenericService,
    private router: Router,
    private snackBar: MatSnackBar,
    private noti: NotificacionService,
    private activeRouter: ActivatedRoute,

   // Cambiar a nullable
  ) {
    this.reactiveForm();
  }
  ngOnInit(): void {
    
    // if (this.eventToEdit) {
    //   this.eventForm.patchValue({
    //     descripcion: this.eventToEdit.descripcion,
    //     fecha: this.eventToEdit.fecha,
    //     cupo: this.eventToEdit.cupo,
    //     imagen: this.eventToEdit.imagen
    //   });
    //   this.previewImage = this.sanitizeImage(this.eventToEdit.imagen);
    // }

    this.activeRouter.params.subscribe((params: Params) => {
      this.Id = params['id'];
      console.log('ID', this.Id)
      if (this.Id != undefined && !isNaN(Number(this.Id))) {
        this.IsCreate = false;
        this.TitleForm = 'Actualizar Evento';
        //call al api
        this.eventService
        .getEventById('/getById',`?id=${this.Id}`)
        .subscribe({
          next: (call) => {
            console.log('EDIT CALL', call)
            this.EventInfo=call.data
            console.log('UserInfo', this.EventInfo)
            this.eventForm.setValue({
              Id:this.EventInfo.id,
              name: this.EventInfo.name,
              descripcion: this.EventInfo.descripcion,
              fecha: this.formatDate(this.EventInfo.fecha),
              cupo: this.EventInfo.cupo,
              imagen: this.EventInfo.imagen
            });
            this.previewImage = this.sanitizeImage(this.EventInfo.imagen);
          },
          error: () => {
            this.noti.mensaje('Error', 'Error de conexion', TipoMessage.error);
          },
        });
  


      }
    });
  }

  reactiveForm() {
    this.eventForm = this.fb.group({
      Id:[null,null],
      name: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      cupo: [0, [
        Validators.required,
        Validators.min(6)
      ]],
      imagen:  [null, Validators.required] 
    });
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
        this.previewImage = this.previewImage.replace('data:image/png;base64,', '');
        this.eventForm.patchValue({
          imagen: this.previewImage
        });
      };
      reader.readAsDataURL(file);
    }
  }
  
  
  addEvent(): void {
    this.submitted = true;
    if (this.eventForm.valid) {
      const obj = this.eventForm.value;
      obj.Id= this.Id;
     
      if (!this.IsCreate) {
        const eventId = this.Id;
        this.eventService.updateEvent('/update', this.eventForm.value).subscribe({
          next: (response) => {
            //this.snackBar.open('Evento actualizado correctamente', 'Cerrar', { duration: 5000 });
            console.log('update response',response)
            if(response.statusCode==200){
              this.noti.mensaje(
                'Exito',
                'Evento actualizado correctamente',
                TipoMessage.success
              );
              this.router.navigate(['/events']);
            }

          },
          error: (error) => {
            let errorMessage = 'Error al actualizar el evento.';
            if (error.error) {
              if (error.error.title) {
                errorMessage = error.error.title;
              } else if (error.error.errors) {
                errorMessage = this.formatValidationErrors(error.error.errors);
              }
            }
            this.snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
          }
        });
      } else {
        this.eventService.addEvent(this.eventForm.value).subscribe({
          next: (response) => {
            this.snackBar.open('Evento creado correctamente', 'Cerrar', { duration: 5000 });
           console.log('response create',response)
            if (response.statusCode == 400 || response.statusCode == 401 ) {
              this.noti.mensaje(
                'Error',
                response.message,
                TipoMessage.warning
              );
              return;
            }
  
            if (response.statusCode == 500) {
              this.noti.mensaje('Error', 'Error de conexion', TipoMessage.error);
              return;
            }
  
            if(response.statusCode==200){
              this.noti.mensaje(
                'Exito',
                'Evento creado correctamente',
                TipoMessage.success
              );
              this.router.navigate(['/events']);
            }
  
          },
          error: (error) => {
            let errorMessage = 'Error al crear el evento.';
            if (error.error) {
              if (error.error.title) {
                errorMessage = error.error.title;
              } else if (error.error.errors) {
                errorMessage = this.formatValidationErrors(error.error.errors);
              }
            }
            this.snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
          }
        });
      }
    } else {
      return;
    }
  }
  formatValidationErrors(errors: any): string {
    let errorMessage = 'Errores de validación:';
    Object.keys(errors).forEach(key => {
      errorMessage += `\n- ${key}: ${errors[key].join(', ')}`;
    });
    return errorMessage;
  }

  public errorHandling = (control: string, error: string) => {
    return this.eventForm.controls[control].hasError(error);
  };

  sanitizeImage(image: string): string {
    return `data:image/png;base64,${image}`;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

}