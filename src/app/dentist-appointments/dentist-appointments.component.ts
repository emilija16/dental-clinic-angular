import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { prototype } from 'events';
import { Appointment } from '../appointment';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-dentist-appointments',
  templateUrl: './dentist-appointments.component.html',
  styleUrls: ['./dentist-appointments.component.scss']
})

export class DentistAppointmentsComponent implements OnInit {
  checked: boolean = false;
  today = new Date();
  appointments: Appointment[]
  dailyAppointments: Appointment[] = []
  weeklyAppointments: Appointment[] = []
  weeklyAppointmentsSorted = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  }
  timeSorted = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.getDailyAppointments();
    this.getWeeklyAppointments();
  
  }

  getDailyAppointments() {
    const dateFormat = formatDate(this.today, 'yyyy-MM-dd', 'en-US');
    this.appointmentService.getAllAppointments().subscribe(data => {
      this.appointments = data;
      for(let i = 0; i < this.appointments.length; i++) {
        if(this.appointments[i].date === dateFormat) {
          this.dailyAppointments.push(this.appointments[i]);
          console.log(this.dailyAppointments)
        }
      }
      for(let i = 0; i < this.dailyAppointments.length; i++) {
        this.timeSorted.push(this.dailyAppointments[i].time)
      console.log("ovo su:::" + this.timeSorted)
      }
    })
  }

  getWeeklyAppointments() {
    this.appointmentService.getWeeklyAppointments()
    .subscribe(appointments => {
      // Add weekly appointments with formatted date objects
      for (const appointment of appointments) {
        appointment.date = this.getAppointmentDateObject(appointment.date);
        this.weeklyAppointments.push(appointment);
      }
      this.sortAppointments(this.weeklyAppointments);
    })
  }

  sortAppointments(appointments: Appointment[]) {
    console.log('sortAppointments called!');
    console.log(appointments);
    for (const appointment of appointments) {
      const dayOfWeek = appointment.date.getDay();
      console.log('-----------------------');
      console.log(dayOfWeek);
      console.log(this.dayOfWeekAsString(dayOfWeek));
      console.log('-----------------------');
      this.weeklyAppointmentsSorted[dayOfWeek].push(appointment);
    }

    console.log(this.weeklyAppointmentsSorted);
  }

  getAppointmentDateObject(date: string) {
    var parts = date.split('-');
    // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
    // January - 0, February - 1, etc.
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  }

  dayOfWeekAsString(dayIndex) {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayIndex] || '';
  }

  getTimeFormatted(time: string) {
    const parts = time.split(':');
    return parts[0] + ':' + parts[1];
  }
}
