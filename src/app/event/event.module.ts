import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { EventAddComponent } from './event-add/event-add.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
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
import { EventListUserComponent } from './event-list-user/event-list-user.component';
import { EventByUserComponent } from './event-by-user/event-by-user.component';



@NgModule({
  declarations: [
    EventAddComponent,
    EventListComponent,
    EventEditComponent,
    EventDetailComponent,
    EventListUserComponent,
    EventByUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
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
    MatFormFieldModule
  ]
})
export class EventModule { }

export interface MyEvent {
  descripcion: string;
  fecha: string;
  cupo: number;
  imagen: File | null;
}