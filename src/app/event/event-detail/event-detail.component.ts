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
    return `data:image/png;base64,${image}`;
  }
}
