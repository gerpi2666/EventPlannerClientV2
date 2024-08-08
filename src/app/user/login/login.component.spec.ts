import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa este módulo
import { LoginComponent } from './login.component';
import { GenericService } from 'src/app/services/generic.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { NotificacionService } from 'src/app/services/notification.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
//material imports

describe('LoginComponent', () => {
 

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
          ],      declarations: [LoginComponent],
          providers: [
            GenericService,
            NotificacionService,
            ToastrService,
           
    
          ]
    });
  
  });

  it('Componente login creado correctamente', () => {
    const fixture =  TestBed.createComponent(LoginComponent);
    const app= fixture.componentInstance

    

    expect(app).toBeTruthy();
  });

  it('Validacion de que se envie sin datos nulos ingresados', () => {
    const fixture =  TestBed.createComponent(LoginComponent);
    const app= fixture.componentInstance

    fixture.detectChanges()

    const form=app.formulario;
    const email= form.controls['email'];
    email.setValue('gerpi.2666@gmail.com')

    expect(app.formulario.invalid).toBeTrue();
  });

  
  it('Validacion de que se envie con datos completos', () => {
    const fixture =  TestBed.createComponent(LoginComponent);
    const app= fixture.componentInstance

    fixture.detectChanges()

    const form=app.formulario;
    const email= form.controls['email'];
    const password= form.controls['password'];

    email.setValue('gerpi.2666@gmail.com')
    password.setValue('123456')

    
    expect(app.formulario.invalid).toBeFalse();
  });

  it('Logueo de un usuario que no existe', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
  
    // Simular el servicio y su respuesta
    const gService = TestBed.inject(GenericService);
    const testResponse = {
      statusCode: 200,
      message: 'Exito',
      data: { rol: 2 }
    };
    
    spyOn(gService, 'create').and.returnValue(of(testResponse));
  
    fixture.detectChanges();
  
    const form = app.formulario;
    const email = form.controls['email'];
    const password = form.controls['password'];
  
    email.setValue('gerpi.2666@gmail.com');
    password.setValue('123456');
  
    const submitButton = fixture.debugElement.query(By.css("button.custom-button"));
    submitButton.nativeElement.click();
  
    fixture.detectChanges(); // Asegúrate de que Angular aplique los cambios de la prueba
  
    expect(app.isCheck).toEqual(testResponse);
  });

  it('Logueo de usuario con credenciales no validas', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
  
    // Simular el servicio y su respuesta
    const gService = TestBed.inject(GenericService);
    const testResponse = {
        "statusCode": 401,
        "message": "Credenciales invalidas",
        "data": null
      };
    
    spyOn(gService, 'create').and.returnValue(of(testResponse));
  
    fixture.detectChanges();
  
    const form = app.formulario;
    const email = form.controls['email'];
    const password = form.controls['password'];
  
    email.setValue('client1@example.com');
    password.setValue('12345');
  
    const submitButton = fixture.debugElement.query(By.css("button.custom-button"));
    submitButton.nativeElement.click();
  
    fixture.detectChanges(); // Asegúrate de que Angular aplique los cambios de la prueba
  
    expect(app.isCheck).toEqual(testResponse);
  });
  
  it('Logueo Correctamente', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
  
    // Simular el servicio y su respuesta
    const gService = TestBed.inject(GenericService);
    const testResponse = {
        "statusCode": 200,
        "message": "Credenciales validas",
        "data": {
          "id": 4,
          "password": "u6QXcpElu3jBzi22FNFdrw==",
          "email": "client1@example.com",
          "expirationDate": "2024-12-31T00:00:00",
          "rol": 2,
          "rolDescripcion": "Cliente",
          "nombreUsuario": "Username"
        }
      };
    
    spyOn(gService, 'create').and.returnValue(of(testResponse));
  
    fixture.detectChanges();
  
    const form = app.formulario;
    const email = form.controls['email'];
    const password = form.controls['password'];
  
    email.setValue('client1@example.com');
    password.setValue('123456');
  
    const submitButton = fixture.debugElement.query(By.css("button.custom-button"));
    submitButton.nativeElement.click();
  
    fixture.detectChanges(); // Asegúrate de que Angular aplique los cambios de la prueba
  
    expect(app.isCheck).toEqual(testResponse);
  });
  


});
