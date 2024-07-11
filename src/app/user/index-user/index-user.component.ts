import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/services/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/services/notification.service';

export interface PeriodicElement {
  id: number;
  name: string;
  work: string;
  project: string;
  priority: string;
  badge: string;
  budget: string;
}


@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.scss']
})
export class IndexUserComponent implements OnInit {

  DatoAllUser:any
  displayedColumns: string[] = ['id', 'Nombre', 'Correo', 'Fecha vencimiento', 'Acciones'];
  dataSource : any;

  constructor(
    private gService: GenericService,
    private noti: NotificacionService,
    private router: Router

  ) {
    this.CallUser()
  }

  CallUser(){

    this.gService
    .list('/getAll')
    .subscribe({
      next: (call) => {
        
        this.DatoAllUser= call.data
        console.log('DATOS LIST callback',this.DatoAllUser)
        this.dataSource= this.DatoAllUser
      },
      error: () => {
        this.noti.mensaje('Error', 'Error de conexion', TipoMessage.error);
      },
    });

  }
  
  updateUser(id:number){

  }

  deleteUser(id:number){
    
    console.log('Id deleted',id)
    debugger
    this.gService
    .delete(`/delete`, id)       
    .subscribe({
    next: (call) => {
      if (call.statusCode == 400 || call.statusCode == 401 ) {
        this.noti.mensaje(
          'Error',
          'Usuario no encontrado',
          TipoMessage.warning
        );
        return;
      }

      if (call.statusCode == 500) {
        this.noti.mensaje('Error', 'Error de conexion', TipoMessage.error);
        return;
      }

      if(call.statusCode==200){
        this.noti.mensaje(
          'Exito',
          'Usuario Eliminado con exito',
          TipoMessage.success
        );
        this.router.navigate(['/users']);
      }
    },
    error: () => {
      this.noti.mensaje('Error', 'Error de conexion', TipoMessage.error);
    },
     });


  }

  ngOnInit(): void {
  }

}
