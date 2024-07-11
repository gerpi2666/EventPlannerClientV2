
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  // URL del API, definida en environments/environment.ts
  urlAPI: string = 'https://localhost:44393/User';

  private apiUrl = 'https://localhost:44393/Event'; // Cambia esto por tu URL real

  constructor(private http: HttpClient) {}

  
  getEvents(endopoint: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${endopoint}`);
  }

  getEventById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addEvent(objCreate: any | any): Observable<any> {
    
    return this.http.post<any | any[]>(`${this.apiUrl}/create-event`, objCreate);
   
  }

  updateEvent(id: number, event: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, event);
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Método para resetear la contraseña
  resetPassword(email: string, newPassword: string): Observable<any> {
    const body = { email, newPassword };
    return this.http.post<any>(`${this.urlAPI}/reset-password`, body);
  }
  // Resto de métodos CRUD (Listar, Obtener, Crear, Actualizar)...
  list(endopoint: string): Observable<any> {
    return this.http.get<any>(`${this.urlAPI}${endopoint}`);
  }

  get(endopoint: string, filtro: any): Observable<any | any[]> {
    return this.http.get<any | any[]>(`${this.urlAPI}${endopoint}/${filtro}`);
  }

  delete(endopoint: string, filtro: any): Observable<any | any[]> {
    return this.http.post<any | any[]>(`${this.urlAPI}${endopoint}?id=${filtro}`,null);
  }
  create(endopoint: string, objCreate: any | any): Observable<any | any[]> {
    return this.http.post<any | any[]>(`${this.urlAPI}${endopoint}`, objCreate);
  }

  update(endopoint: string, objUpdate: any | any): Observable<any | any[]> {
    return this.http.post<any | any[]>(`${this.urlAPI}${endopoint}/${objUpdate.id}`, objUpdate);
  }
}
