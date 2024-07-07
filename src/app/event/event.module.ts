import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { EventAddComponent } from './event-add/event-add.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EventAddComponent,
    EventListComponent,
    EventEditComponent,
    EventDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EventModule { }

export interface MyEvent {
  descripcion: string;
  fecha: string;
  cupo: number;
  imagen: File | null;
}