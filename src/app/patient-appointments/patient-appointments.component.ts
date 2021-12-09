import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from '../appointment';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-patient-appointments',
  templateUrl: './patient-appointments.component.html',
  styleUrls: ['./patient-appointments.component.scss']
})
export class PatientAppointmentsComponent implements OnInit {

  appointments: Appointment[];
  patientAppointments: Appointment[] = [];
  invalidCancel = false;

  constructor(private appointmentService: AppointmentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
   this.getPatientAppointments()
  }

  getPatientAppointments(): void {
    if(localStorage.getItem("patientJmbg") !== null) {
      const jmbg = this.route.snapshot.params.jmbg;
      this.appointmentService.getAllAppointments().subscribe(data => {
        this.appointments = data;
        for(let i = 0; i < this.appointments.length; i++) {
        if(this.appointments[i].jmbg === jmbg && this.appointments[i].canceled !== true) {
            this.patientAppointments.push(this.appointments[i]);
            console.log(this.patientAppointments)
          }  
        }
      })
    }
    else {
      this.router.navigate(['identification-patient'])
    }
  }

  cancel(id: number): void {
    this.appointmentService.cancelAppointment(id).subscribe(() => {
      const canceledAppointment = this.patientAppointments.find(x => x.id === id);
      this.patientAppointments.splice(this.patientAppointments.indexOf(canceledAppointment), 1);
    }, error => {
      this.invalidCancel = true;
    })
  }
}
