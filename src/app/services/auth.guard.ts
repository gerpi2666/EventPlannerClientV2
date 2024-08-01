import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './Auth.service';
import { NotificacionService, TipoMessage } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private noti: NotificacionService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRoles = route.data['roles'] as Array<string>;

    if (this.authService.isAuthenticated()) {
      if (requiredRoles && requiredRoles.length && !this.authService.hasRole(requiredRoles)) {
        this.noti.mensajeRedirect(
          'Usuario',
          `Usuario sin permisos para acceder`,
          TipoMessage.warning,
          '/Dash'
        );
        this.router.navigate(['/Dash']);
        return false;
      }
      return true;
    }

    this.noti.mensajeRedirect(
      'Usuario',
      `Usuario no autenticado`,
      TipoMessage.warning,
      '/login'
    );
    this.router.navigate(['/login']);
    return false;
  }
}
