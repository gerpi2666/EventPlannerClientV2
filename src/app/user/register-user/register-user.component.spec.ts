import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { RegisterUserComponent } from './register-user.component';
import { GenericService } from 'src/app/services/generic.service';
import { NotificacionService } from 'src/app/services/notification.service';
import { ToastrModule, ToastrService } from 'ngx-toastr'; 

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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisterUserComponent', () => {
  // let component: RegisterUserComponent;
  // let fixture: ComponentFixture<RegisterUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,

        // Angular Material Modules
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
        MatFormFieldModule
      ],
      declarations: [RegisterUserComponent],
      providers: [
        GenericService,
        NotificacionService,
        ToastrService,
       

      ]
    });
    // fixture = TestBed.createComponent(RegisterUserComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('Componente Registro de usuario inicializado con exito', () => {
    const fixture =  TestBed.createComponent(RegisterUserComponent);
    const app= fixture.componentInstance
    expect(app).toBeTruthy();
  });

  it('Validacion del envio de sin datos nulos', () => {
    const fixture =  TestBed.createComponent(RegisterUserComponent);
    const app= fixture.componentInstance

    fixture.detectChanges()

    const form=app.formulario;
    const Email= form.controls['Email'];
    Email.setValue('gerpi.2666@gmail.com')

    expect(app.formulario.invalid).toBeTrue();
  });

  
  it('Validacion de datos completos', () => {
    const fixture =  TestBed.createComponent(RegisterUserComponent);
    const app= fixture.componentInstance

    fixture.detectChanges()

    const form=app.formulario;
    const  id = form.controls['id']
    const  Email = form.controls['Email']
    const  Password = form.controls['Password']
    const  ExpirationDate = form.controls['ExpirationDate']
    const  Rol = form.controls['Rol']
    const  NombreUsuario = form.controls['NombreUsuario']	

    Email.setValue('gerado@bagaces.com')
    Password.setValue('123456')
    ExpirationDate.setValue('2')
    Rol.setValue('2')
    NombreUsuario.setValue('Gerardo Picado')
    

    expect(app.formulario.invalid).toBeFalse();
  });

  
});
