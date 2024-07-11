import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { EventDetailComponent } from '../event-detail/event-detail.component';
import { EventAddComponent } from '../event-add/event-add.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  errorMessage: string = '';
  DatoAllEvent: any;
  dataSource: any;

  constructor(
    private eventService: GenericService,
    private noti: NotificacionService,
    private dialog: MatDialog,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.ListEvents();
  }

  ListEvents() {
    this.eventService.getEvents('/List').subscribe({
      next: (call) => {
        this.DatoAllEvent = call.data;

        this.DatoAllEvent.forEach((element) => {
          if (element.activo) {
            console.log('DATOS LIST callback', this.DatoAllEvent);
            this.dataSource = element.eventos;
          }
        });
      },
      error: () => {
        this.noti.mensaje('Error', 'Error de conexion', TipoMessage.error);
      },
    });
  }

  deleteEvent(id: number) {
    console.log('Id deleted', id);
    this.eventService.deleteEvent(`/delete`, id).subscribe({
      next: (call) => {
        if (call.statusCode == 400 || call.statusCode == 401) {
          this.noti.mensaje(
            'Error',
            'Evento no encontrado',
            TipoMessage.warning
          );
          return;
        }

        if (call.statusCode == 500) {
          this.noti.mensaje('Error', 'Error de conexion', TipoMessage.error);
          return;
        }

        if (call.statusCode == 200) {
          this.noti.mensaje(
            'Exito',
            'Evento eliminado con exito',
            TipoMessage.success
          );
          window.location.reload(); 
        }

      },
      error: () => {
        this.noti.mensaje('Error', 'Error de conexion', TipoMessage.error);
      },
    });
  }

  updateEvent(id:number){
    this.router.navigate([`events/edit/${id}`]);

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
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ListEvents(); // Actualiza la lista de eventos después de editar
      }
    });
  }

}
  

