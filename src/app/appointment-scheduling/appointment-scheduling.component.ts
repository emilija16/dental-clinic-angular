import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Appointment } from '../appointment';
import { AppointmentService } from '../appointment.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-appointment-scheduling',
  templateUrl: './appointment-scheduling.component.html',
  styleUrls: ['./appointment-scheduling.component.scss']
})
export class AppointmentSchedulingComponent implements OnInit {

  appointment: Appointment = new Appointment();
  appointments: Appointment[];

  time: {hour: 13, minute: 30};
  hourStep = 1;
  minuteStep = 30;
  duration = 0;
  date: NgbDateStruct;
  today = new Date();
  invalidTime = false;
  invalidDate = false;
  appointmentExists = false;
  invalidData = false;
  errorMessage=""

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.getAppointmentsFromService();
  }

  onItemChange(value){
    console.log(" Value is : ", value);
    if(value === "60") {
      this.minuteStep = 0;
    }
    this.duration = value;
 }

 saveAppointment() {
  const dateFormat = this.date.year + "-" +
  [(this.date.month < 10 ? ('0' + this.date.month) : this.date.month),
  (this.date.day < 10 ? ('0' + this.date.day) : this.date.day)].join("-");
  console.log("Selected date: " + dateFormat);

  // Format Today Date
  const todayDateFormat = formatDate(this.today, 'yyyy-MM-dd', 'en-US');
  // Provera
  if(dateFormat < todayDateFormat) {
    return this.invalidDate = true;
  } else {
    this.appointment.date = dateFormat;
  }

  const timeFormat = [(this.time.hour < 10 ? ('0' + this.time.hour) : this.time.hour),
  (this.time.minute < 10 ? ('0' + this.time.minute) : this.time.minute)].join(":");

  if(this.time.hour >= 9 && this.time.hour <= 17) {
    this.appointment.time = timeFormat;
    this.invalidTime = false;
  }
  else {
    return this.invalidTime = true;
  }
  for(let i = 0; i < this.appointments.length; i++) {
    if(this.appointments[i].date === dateFormat &&
       this.appointments[i].time === timeFormat + ":" + "00" &&
       !this.appointments[i].canceled) {
       return this.appointmentExists = true;
    }
    this.appointmentExists = false;
  }
 
  this.appointment.duration = this.duration;

    this.appointmentService.save(this.appointment).subscribe(data => {
    console.log(data)
    alert("Successfully scheduled appointment!")
    }
  )
}

getAppointmentsFromService() {
  this.appointmentService.getAllAppointments().subscribe(appointments => {
    this.appointments = appointments;
  })
}

  onSubmit() {
    this.saveAppointment();
  }
}
