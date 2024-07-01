import { Component, OnInit } from '@angular/core';
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
    private noti: NotificacionService
   
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
    
  }

  ngOnInit(): void {
  }

}
