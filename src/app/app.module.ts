import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsModule } from '@angular/forms'
import { ToastrModule } from 'ngx-toastr';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullComponent } from './layouts/full/full.component';
import { DemoFlexyModule } from './demo-flexy-module'
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import es from '@angular/common/locales/es';



// Modules
import { DashboardModule } from './dashboard/dashboard.module';
import { ComponentsModule } from './components/components.module';
import { UserModule } from './user/user.module';
import { ServicesModule } from './services/services.module';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { RouterModule } from '@angular/router';
import { EventModule } from './event/event.module'; 
import { CreateComponent } from './Users/create/create.component';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    CreateComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FeatherModule.pick(allIcons),
    ToastrModule.forRoot(), 
    FormsModule,
    RouterModule ,

 

    ServicesModule,
    UserModule,
    DemoFlexyModule,
    DashboardModule,
    ComponentsModule,
    EventModule 
   
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
