import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../services/Auth.service'; // Asegúrate de tener la ruta correcta
import { Router } from '@angular/router';

interface SidebarMenu {
  link: string;
  icon: string;
  menu: string;
  roles: string[]; // Añade un campo roles para especificar los roles que pueden ver esta opción
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {
  userName: string = '';
  search: boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  routerActive: string = "activelink";
  currentUserRole: string;

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) { }

  
  sidebarMenu: SidebarMenu[] = [
    {
      link: "/Dash",
      icon: "home",
      menu: "Dashboard",
      roles: ['SuperAdministrador', 'Administrador']
    },
    {
      link: "/events-users",
      icon: "home",
      menu: "Eventos disponibles",
      roles: [ 'Cliente']
    },
    {
      link: "/events-byUser",
      icon: "home",
      menu: "Eventos por usuarios",
      roles: ['Cliente']
    },
    {
      link: "/events",
      icon: "file-text",
      menu: "Lista de eventos",
      roles: ['SuperAdministrador', 'Administrador']
    },
    {
      link: "/users",
      icon: "users",
      menu: "Usuarios",
      roles: ['SuperAdministrador', 'Administrador']
    },
    // Añade más elementos del menú según sea necesario
  ];

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    this.currentUserRole = currentUser ? currentUser.rolDescripcion : '';
    this.filterMenuByRole();
    this.getUserName();
  }

  filterMenuByRole() {
    this.sidebarMenu = this.sidebarMenu.filter(menuItem => menuItem.roles.includes(this.currentUserRole));
  }

  getUserName() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.userName = currentUser.nombreUsuario || 'Invitado'; // Cambia 'nombreUsuario' según la propiedad real
  }

  redirectToResetPassword() {
    this.router.navigate(['/reset-password']);
  }

  logout() {
    // Elimina la información del usuario actual de localStorage o cualquier otro almacenamiento
    localStorage.removeItem('currentUser');
    
    // Redirige al usuario a la página de login
    this.router.navigate(['/login']);
  }
}
