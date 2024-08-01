import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  isAuthenticated(): boolean {
    const user = this.getCurrentUser();
    return !!user;
  }

  hasRole(requiredRoles: string[]): boolean {
    const user = this.getCurrentUser();
    if (!user || !user.rolDescripcion) {
      return false;
    }
    return requiredRoles.includes(user.rolDescripcion);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
