import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  
  sanitizeImage(image: string): string {
    // Remueve el prefijo 'data:image/jpeg;base64,' para obtener solo el contenido base64
    return `data:image/png;base64,${image}`;
  }
}
