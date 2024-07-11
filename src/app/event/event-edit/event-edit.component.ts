import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from '../../services/generic.service'; 

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {
  eventId: number;
  event: any = {}; // Assuming you fetch event data to populate this object
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: GenericService // Replace with your event service
  ) { }

  ngOnInit(): void {
    this.eventId = +this.route.snapshot.paramMap.get('id'); // Assuming you retrieve event ID from route params
    //this.fetchEvent(this.eventId);
  }

  // fetchEvent(id: number) {
  //   this.eventService.getEventById(id).subscribe({
  //     next: (event) => {
  //       this.event = event;
  //     },
  //     error: (err) => {
  //       this.errorMessage = 'Error fetching event details.';
  //       console.error('Error fetching event:', err);
  //     }
  //   });
  // }

  // updateEvent() {
  //   this.eventService.updateEvent(this.eventId, this.event).subscribe({
  //     next: () => {
  //       this.router.navigate(['/events']); // Navigate to events list page after successful update
  //     },
  //     error: (err) => {
  //       this.errorMessage = 'Error updating event.';
  //       console.error('Error updating event:', err);
  //     }
  //   });
  // }
}