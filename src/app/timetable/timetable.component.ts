import { Component } from '@angular/core';
import { TimetableService } from '../timetable.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.css'
})
export class TimetableComponent {
  timetables: any[] = [];

  constructor(private timetableService: TimetableService) { }

  ngOnInit(): void {
    this.timetableService.getTimetables().subscribe((data) => {
      this.timetables = data;
    });
  }

}
