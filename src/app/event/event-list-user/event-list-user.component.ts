
import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { EventDetailComponent } from '../event-detail/event-detail.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-event-list-user',
  templateUrl: './event-list-user.component.html',
  styleUrls: ['./event-list-user.component.scss']
})
export class EventListUserComponent implements OnInit {
  errorMessage: string = '';
  DatoAllEvent: any;
  dataSource: any;
  events: any;
  CurrentUser: any


  constructor(
    private eventService: GenericService,
    private noti: NotificacionService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') );
    this.CurrentUser= currentUser.id;
    this.ListEvents();
  
  
  }

  ListEvents() {
    this.eventService.getEVENTS('/ListCustomer',  this.CurrentUser).subscribe({
      next: (call) => {
        this.DatoAllEvent = call.data;
        this.DatoAllEvent.forEach((element) => {
          if (element.activo) {
            this.dataSource = element.eventos;
          }
        });
      },
      error: () => {
        this.noti.mensaje('Error', 'Error de conexion', TipoMessage.error);
      },
    });
  }



  sanitizeImage(image: string): string {
    return `data:image/jpeg;base64,${image}`;
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

  registerEvent(id: number): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.id) {
      this.eventService.registerEvent(currentUser.id, id).subscribe({
        next: (message: string) => {
        
       
          this.noti.mensaje('Suscripcion correctamente', message, TipoMessage.success);
          window.location.reload(); 
        },
        error: (error: any) => {
          this.noti.mensaje('Error', 'No se pudo registrar en el evento', TipoMessage.error);
        }
      });
    } else {
      this.noti.mensaje('Error', 'Usuario no autenticado', TipoMessage.warning);
    }
  }
}  