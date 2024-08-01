
import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { EventDetailComponent } from '../event-detail/event-detail.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-event-by-user',
  templateUrl: './event-by-user.component.html',
  styleUrls: ['./event-by-user.component.scss']
})
export class EventByUserComponent {
  events: any[] = []; 
  DatoAllEvent: any;

  
  constructor(
    private eventService: GenericService,
    private noti: NotificacionService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser);

    this.loadUserEvents();
  }


  loadUserEvents(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
    if (currentUser && currentUser.id) {
      this.eventService.getUserEvents(`/get-events-by-user?usertId=${currentUser.id}`).subscribe({
        next: (response) => {
          // Suponiendo que la respuesta tiene la estructura { data: Evento[] }
          if (response && response.data) {
            this.DatoAllEvent = response.data;
  
            // Filtrar solo los eventos activos
            const activeEvents = this.DatoAllEvent.filter(event => event.activo);
  
            // Asignar la lista de eventos activos a dataSource
            this.events = activeEvents;
  
            // Opcional: Imprimir datos para depuración
            console.log('Datos de eventos activos:', this.events);
          } else {
            this.noti.mensaje('Advertencia', 'No se encontraron eventos.', TipoMessage.warning);
          }
        },
        error: () => {
          this.noti.mensaje('Error', 'Error de conexión', TipoMessage.error);
        }
      });
    } else {
      this.noti.mensaje('Error', 'Usuario no autenticado', TipoMessage.warning);
    }
  }

  unsubscribeFromEvent(eventId: number): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.id) {
      this.eventService.unregisterEvent(currentUser.id, eventId).subscribe({
        next: (message: string) => {
          this.noti.mensaje('Desuscripción exitosa', message, TipoMessage.success);
          this.loadUserEvents(); // Recargar los eventos del usuario
        },
        error: (error: any) => {
          this.noti.mensaje('Error', 'No se pudo desuscribir del evento', TipoMessage.error);
        }
      });
    } else {
      this.noti.mensaje('Error', 'Usuario no autenticado', TipoMessage.warning);
    }
  }


  
  sanitizeImage(image: string): string {
    return `data:image/jpeg;base64,${image}`;
  }
}
  

