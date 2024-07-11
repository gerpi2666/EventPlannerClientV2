import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { EventDetailComponent } from '../event-detail/event-detail.component';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  errorMessage: string = '';
  DatoAllEvent:any;
  dataSource: any;

  constructor(private eventService: GenericService, private noti: NotificacionService, private dialog: MatDialog) { }
  ngOnInit(): void {

 
    this.ListEvents()
  }

  ListEvents(){

    this.eventService
    .getEvents('/List')
    .subscribe({
      next: (call) => {
        
        this.DatoAllEvent= call.data

        this.DatoAllEvent.forEach(element => {
          if(element.activo){
            console.log('DATOS LIST callback',this.DatoAllEvent)
            this.dataSource= element.eventos
            }
        });
        
      },
      error: () => {
        this.noti.mensaje('Error', 'Error de conexion', TipoMessage.error);
      },
    });

  }

  sanitizeImage(image: string): string {
    // Remueve el prefijo 'data:image/jpeg;base64,' para obtener solo el contenido base64
    return `data:image/png;base64,${image}`;
  }

  openDetailDialog(event: any): void {
    const dialogRef = this.dialog.open(EventDetailComponent, {
      width: '500px',
      data: event
    });
  }
}

