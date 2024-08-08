import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IndexUserComponent } from './index-user/index-user.component';
import { LoginComponent } from './login/login.component';

// Importaciones de Angular Material
import { MatCardModule } from '@angular/material/card'; 
import { MatGridListModule } from '@angular/material/grid-list'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';  
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { RegisterUserComponent } from './register-user/register-user.component';

@NgModule({
  declarations: [
    IndexUserComponent,
    LoginComponent,
    ResetPasswordComponent,
    CreateUserComponent,
    RegisterUserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatFormFieldModule // Asegúrate de que MatFormFieldModule está importado
  ]
})
export class UserModule { }
