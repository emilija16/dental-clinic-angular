import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from '../appointment';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-identification-patient',
  templateUrl: './identification-patient.component.html',
  styleUrls: ['./identification-patient.component.scss']
})
export class IdentificationPatientComponent implements OnInit {

  jmbg: string;
  appointmentsList: Appointment[]
  invalidJmbg= false;

  constructor(private appointmentService: AppointmentService, private router: Router) { }

  ngOnInit(): void {
    this.appointmentService.getAllAppointments().subscribe(data => {
      this.appointmentsList = data;
      console.log(this.appointmentsList)
    })
  }

  onSubmit() {
    for(let i = 0; i < this.appointmentsList.length; i++) {
      if(this.appointmentsList[i].jmbg === this.jmbg) {
        localStorage.setItem("patientJmbg", this.jmbg);
        this.router.navigate(['patient-appointments', this.jmbg])
      } else {
        this.invalidJmbg = true;
      }
    }
  }
}
