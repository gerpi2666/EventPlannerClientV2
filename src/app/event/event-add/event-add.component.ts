import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenericService } from '../../services/generic.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/services/notification.service';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss']
})
export class EventAddComponent implements OnInit {
  
  eventForm: FormGroup;
  previewImage:any;
  submitted:boolean;
  constructor(
    private fb: FormBuilder,
    private eventService: GenericService,
    private router: Router,
    private snackBar: MatSnackBar,
    private noti: NotificacionService,

    private dialogRef: MatDialogRef<EventAddComponent> | null, // Cambiar a nullable
    @Inject(MAT_DIALOG_DATA) private eventToEdit: any | null // Cambiar a nullable
  ) {
    this.reactiveForm();
  }
  ngOnInit(): void {
    if (this.eventToEdit) {
      this.eventForm.patchValue({
        descripcion: this.eventToEdit.descripcion,
        fecha: this.eventToEdit.fecha,
        cupo: this.eventToEdit.cupo,
        imagen: this.eventToEdit.imagen
      });
      this.previewImage = this.sanitizeImage(this.eventToEdit.imagen);
    }
  }

  reactiveForm() {
    this.eventForm = this.fb.group({
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
        this.previewImage= this.previewImage.replace('data:image/png;base64,', '');
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
      const { descripcion, fecha, cupo, imagen } = this.eventForm.value;

      if (this.eventToEdit) {
        const eventId = this.eventToEdit.EventoId;
        this.eventService.updateEvent(eventId, this.eventForm.value).subscribe({
          next: (response) => {
            this.snackBar.open('Evento actualizado correctamente', 'Cerrar', { duration: 5000 });
            if (this.dialogRef) {
              this.dialogRef.close(true); // Cierra el diálogo y notifica al componente principal
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
            if (this.dialogRef) {
              this.dialogRef.close(true); // Cierra el diálogo y notifica al componente principal
            } else {
              this.router.navigate(['/eventos']); // Redirige si no se usa el diálogo

          if (response.statusCode == 400 || response.statusCode == 401 ) {
            this.noti.mensaje(
              'Error',
              'Usuario no encontrado',
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

}