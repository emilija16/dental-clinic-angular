import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
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
  model = "";
  duration = 0;
  vreme = "";
  date: NgbDateStruct;

  constructor(private appointmentService: AppointmentService) { 
  }
  onItemChange(value){
    console.log(" Value is : ", value );
    if(value === "60") {
      this.minuteStep = 0;
    }
    this.duration = value;
 }

 saveAppointment() {
  //  if(this.time.hour < 10 || this.time.minute < 10) {
  //    this.vreme = "0" + this.time.hour + ":" + "0" + this.time.minute;
  //  } else {
    this.vreme =  this.time.hour + ":" + this.time.minute;
  //  }
  this.appointment.time = this.vreme;
  console.log("vreme: " + this.vreme)
  const dateFormatm = this.date.year + "-" + this.date.month + "-" + "0" +this.date.day;

  if(this.date.day < 10) {
    this.appointment.date = dateFormatm;

  }
   const dateFormat = this.date.year + "-" + this.date.month + "-" + this.date.day;
   console.log("datum: " + this.appointment.date)
 
   this.appointment.duration = this.duration;
   this.appointmentService.save(this.appointment).subscribe(data => {
    console.log(data)
  })
 }

 onSubmit() {
   this.saveAppointment()
 }
  ngOnInit(): void {
    
  }
}
