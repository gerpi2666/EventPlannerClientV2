import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { NotificacionService, TipoMessage } from './notification.service';
import { inject } from '@angular/core';

export class UserGuard {
  router: Router = inject(Router);
  noti: NotificacionService = inject(NotificacionService);
  auth: boolean = false;

  currentUser: any;
  constructor() {
    //Subscripción a la información del usuario actual
    //this.authService.decodeToken.subscribe((user) => (this.currentUser = user));
    this.currentUser= JSON.parse(localStorage.getItem('refreshTokenCurrent'))
}
  checkUserLogin(route: ActivatedRouteSnapshot): boolean {
    if (this.auth) {
      const userRole = this.currentUser.rol;
      //roles.length && roles.indexOf(verify.role)===-1
      if (
        route.data['roles'].length &&
        !route.data['roles'].includes(userRole)
      ) {
        this.noti.mensajeRedirect(
          'Usuario',
          `Usuario Sin permisos para acceder`,
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
      `Usuario No autenticado`,
      TipoMessage.warning,
      '/usuario/login'
    );
    return false;
  }
}
export const authGuard: CanActivateFn = (route, state) => {
  let userGuard = new UserGuard();
  return userGuard.checkUserLogin(route);
};
