import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenericService } from '../../services/generic.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/services/notification.service';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss']
})
export class EventAddComponent implements OnInit {
  eventForm: FormGroup;
  previewImage:any;
  summited:boolean;
  constructor(
    private fb: FormBuilder,
    private eventService: GenericService,
    private router: Router,
    private snackBar: MatSnackBar,
    private noti: NotificacionService,

  ) {
    this.reactiveForm();
  }

  ngOnInit(): void {}

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
    this.summited=true;
    if (this.eventForm.valid) {
      console.log('Dta form', this.eventForm.value)
      const { descripcion, fecha, cupo, imagen } = this.eventForm.value;

      this.eventService.addEvent(this.eventForm.value).subscribe({
        next: (response) => {
          console.log('Response',response)

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

          
        },
        error: (error) => {
          console.error('Error al crear el evento:', error);
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

    } else {
      console.log('asda', this.eventForm.value)
      console.error('Formulario no válido');
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

  
}
