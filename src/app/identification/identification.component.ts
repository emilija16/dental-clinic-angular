import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from '../appointment';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent implements OnInit {

  jmbg: string;
  appointmentsList: Appointment[]
  invalidLogin= false;

  constructor(private appointmentService: AppointmentService, private router: Router) { }

  ngOnInit(): void {
    this.appointmentService.getAllAppointments().subscribe(data => {
      this.appointmentsList = data;
      console.log(this.appointmentsList)
    })
  }

  onSubmit() {
    for(let i = 0; i < this.appointmentsList.length; i++) {
      if(this.jmbg === "12345") {
        this.router.navigate(['dentist-appointments'])
      } else if(this.appointmentsList[i].jmbg === this.jmbg && this.jmbg !=="12345") {
        this.router.navigate(['patient-appointments', this.jmbg])
      } else {
        this.invalidLogin = true;
      }
    }
  }
}
