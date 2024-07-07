import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenericService } from '../../services/generic.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss']
})
export class EventAddComponent implements OnInit {
  eventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventService: GenericService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.reactiveForm();
  }

  ngOnInit(): void {}

  reactiveForm() {
    this.eventForm = this.fb.group({
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      cupo: [0, Validators.required],
      imagen: [null] // No es necesario un validator para un campo de tipo file
    });
  }

  addEvent(): void {
    if (this.eventForm.valid) {
      const { descripcion, fecha, cupo, imagen } = this.eventForm.value;

      this.eventService.addEvent(descripcion, fecha, cupo, imagen).subscribe({
        next: (response) => {
          this.snackBar.open('Evento creado correctamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/create-event']);
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
      console.error('Formulario no válido');
    }
  }

  formatValidationErrors(errors: any): string {
    let errorMessage = 'Errores de validación:';
    Object.keys(errors).forEach(key => {
      errorMessage += `\n- ${key}: ${errors[key].join(', ')}`;
    });
    return errorMessage;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.eventForm.patchValue({
      imagen: file
    });
  }

  getObjectUrl(file: File): string {
    return URL.createObjectURL(file);
  }
}
