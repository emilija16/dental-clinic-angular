import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Appointment } from '../appointment';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointment-scheduling',
  templateUrl: './appointment-scheduling.component.html',
  styleUrls: ['./appointment-scheduling.component.scss']
})
export class AppointmentSchedulingComponent implements OnInit {

  appointment: Appointment = new Appointment();

  time: {hour: 13, minute: 30};
  hourStep = 1;
  minuteStep = 30;
  duration = 0;
  date: NgbDateStruct;
  invalidData = false;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
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
  console.log("ovo je formatiran datum: " + dateFormat);
  this.appointment.date = dateFormat;

  const timeFormat = [(this.time.hour < 10 ? ('0' + this.time.hour) : this.time.hour),
  (this.time.minute < 10 ? ('0' + this.time.minute) : this.time.minute)].join(":");
  console.log("ovo je formatirano vreme: " + timeFormat);
  if(this.time.hour >= 9 && this.time.hour <= 17) {
    this.appointment.time = timeFormat;
    this.invalidData = true;
  }
  else {
    return this.invalidData = true;
  }
  this.appointment.duration = this.duration;
    this.appointmentService.save(this.appointment).subscribe(data => {
    console.log(data)
    }
  )
}

  onSubmit() {
    this.saveAppointment()
  }
}
