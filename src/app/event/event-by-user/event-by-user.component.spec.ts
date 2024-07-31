import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventByUserComponent } from './event-by-user.component';

describe('EventByUserComponent', () => {
  let component: EventByUserComponent;
  let fixture: ComponentFixture<EventByUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventByUserComponent]
    });
    fixture = TestBed.createComponent(EventByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
