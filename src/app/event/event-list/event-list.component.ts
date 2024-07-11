import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/services/notification.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  errorMessage: string = '';
  DatoAllEvent:any;
  dataSource: any[] = [];

  constructor(private eventService: GenericService, private noti: NotificacionService) { }
  ngOnInit(): void {

 
    this.ListEvents()
  }

  ListEvents(){

    this.eventService
    .getEvents('/List')
    .subscribe({
      next: (call) => {
        
        this.DatoAllEvent= call
        console.log('DATOS LIST callback',this.DatoAllEvent)
        this.dataSource= this.DatoAllEvent
      },
      error: () => {
        this.noti.mensaje('Error', 'Error de conexion', TipoMessage.error);
      },
    });

  }

  sanitizeImage(image: string): string {
    // Remueve el prefijo 'data:image/jpeg;base64,' para obtener solo el contenido base64
    return `data:image/png;base64,`;
  }
}
