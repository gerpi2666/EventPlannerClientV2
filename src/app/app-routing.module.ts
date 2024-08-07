import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ChipsComponent } from './components/chips/chips.component';
import { ExpansionComponent } from './components/expansion/expansion.component';
import { FormsComponent } from './components/forms/forms.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProgressSnipperComponent } from './components/progress-snipper/progress-snipper.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { SliderComponent } from './components/slider/slider.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { ProductComponent } from './dashboard/dashboard-components/product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { IndexUserComponent } from './user/index-user/index-user.component';
import { LoginComponent } from './user/login/login.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventAddComponent } from './event/event-add/event-add.component';
import { EventByUserComponent } from './event/event-by-user/event-by-user.component';
import { EventDetailComponent } from './event/event-detail/event-detail.component';
import {EventListUserComponent  } from './event/event-list-user/event-list-user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: FullComponent,
    children: [
      { path: 'Dash', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrador', 'Administrador', 'Cliente'] } },
      { path: 'reset-password', component: ResetPasswordComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrador', 'Administrador', 'Cliente'] } },
      { path: 'alerts', component: AlertsComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrador'] } },
      { path: 'forms', component: FormsComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrador'] } },
      { path: 'table', component: ProductComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrador'] } },
      { path: 'grid-list', component: GridListComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrador'] } },
      { path: 'menu', component: MenuComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrador'] } },
      { path: 'tabs', component: TabsComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrador'] } },
      { path: 'expansion', component: ExpansionComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrador'] } },
      { path: 'chips', component: ChipsComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrador'] } },
      { path: 'progress', component: ProgressComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrador'] } },
      { path: 'toolbar', component: ToolbarComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrador'] } },
      { path: 'progress-snipper', component: ProgressSnipperComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrador'] } },
      { path: 'snackbar', component: SnackbarComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrador'] } },
      { path: 'slider', component: SliderComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrador'] } },
      { path: 'slide-toggle', component: SlideToggleComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrador'] } },
      { path: 'tooltip', component: TooltipsComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrador'] } },
      { path: 'button', component: ButtonsComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrador'] } },
      { path: 'users', component: IndexUserComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrador', 'Administrador'] } },
      { path: 'events', component: EventListComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrador', 'Administrador'] } },
      { path: 'events-users', component: EventListUserComponent, canActivate: [AuthGuard], data: { roles: [ 'Cliente'] } },
      { path: 'events-byUser', component: EventByUserComponent, canActivate: [AuthGuard], data: { roles: [ 'Cliente'] } },
      { path: 'events/add', component: EventAddComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrador'] } },
      { path: 'events/edit/:id', component: EventAddComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrador'] } },
      { path: 'events/:id', component: EventDetailComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrador', 'Cliente'] } },
      { path: 'users/create', component: CreateUserComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrador'] } },
      { path: 'users/detail/:id', component: CreateUserComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrador'] } },
      { path: 'users/edit/:id', component: CreateUserComponent, canActivate: [AuthGuard], data: { roles: ['SuperAdministrador'] } }
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [] // Asegúrate de incluir el guardia en los proveedores
})
export class AppRoutingModule { }