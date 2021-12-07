import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Appointment } from '../appointment';
import { AppointmentService } from '../appointment.service';
import { Dentist } from '../dentist';

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
  invalidCancelDaily = false;
  invalidCancelWeekly = false;
  dentists: Dentist[];
  dentist: Dentist = new Dentist()
  displayMessage = false;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.getDailyAppointments();
    this.getWeeklyAppointments();
    this.getDentistsFromService();
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
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  }

  dayOfWeekAsString(dayIndex) {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayIndex] || '';
  }

  getTimeFormatted(time: string) {
    const parts = time.split(':');
    return parts[0] + ':' + parts[1];
  }

  cancelAppointmentDaily(id: number): void {
    this.appointmentService.cancelAppointment(id).subscribe(() => {
      const canceledAppointment = this.dailyAppointments.find(x => x.id === id);
      this.dailyAppointments.splice(this.dailyAppointments.indexOf(canceledAppointment), 1);
    }, error => {
      this.invalidCancelDaily = true;
    })
  }

  cancelAppointmentWeekly(id: number): void {
    this.appointmentService.cancelAppointment(id).subscribe(() => {
    }, error => {
      this.invalidCancelWeekly = true;
    })
  }

  getDentistsFromService() {
    this.appointmentService.getDentists().subscribe(data => {
      this.dentists = data;
      this.dentist = this.dentists[0]
      }
    )  
  }

  onSubmit() {
    this.appointmentService.changeCancellationDeadline(this.dentist).subscribe(data => {
    this.displayMessage = true;
    },
    error => console.log(error))

  }
}
