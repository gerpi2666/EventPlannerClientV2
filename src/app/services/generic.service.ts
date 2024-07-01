import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  // URL del API, definida en environments/environment.ts
  urlAPI: string = 'https://localhost:44393/User';

  constructor(private http: HttpClient) {}

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

  create(endopoint: string, objCreate: any | any): Observable<any | any[]> {
    return this.http.post<any | any[]>(`${this.urlAPI}${endopoint}`, objCreate);
  }

  update(endopoint: string, objUpdate: any | any): Observable<any | any[]> {
    return this.http.post<any | any[]>(`${this.urlAPI}${endopoint}/${objUpdate.id}`, objUpdate);
  }
}
