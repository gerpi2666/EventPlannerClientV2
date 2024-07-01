import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  // URL del API, definida en enviroments->enviroment.ts
  urlAPI: string ='https://localhost:7199/User';
  //Información usuario actual
  currentUser: any;

  //Inyectar cliente HTTP para las solicitudes al API
  constructor(private http: HttpClient) {
   
  }
 
  // Listar
  list(endopoint: string): Observable<any> {
    return this.http.get<any>(this.urlAPI + endopoint);
  }
  // Obtener
  get(endopoint: string, filtro: any): Observable<any | any[]> {
    console.log('RUTA ANTES DEL GET',this.urlAPI+''+endopoint+'/'+filtro)

    return this.http.get<any | any[]>(this.urlAPI + endopoint + `/${filtro}`);
  }
  // crear
  create(endopoint: string, objCreate: any | any): Observable<any | any[]> {
    console.log('Ruta antes de la llamada' , this.urlAPI)
    return this.http.post<any | any[]>(this.urlAPI + endopoint, objCreate);
  }
  // actualizar
  update(endopoint: string, objUpdate: any | any): Observable<any | any[]> {
    return this.http.put<any | any[]>(
      this.urlAPI + endopoint + `/${objUpdate.id}`,
      objUpdate
    );
  }

}
