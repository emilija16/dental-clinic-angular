import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private appointmentService: AppointmentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.getPatientAppointments()
  }

  getPatientAppointments(): void {
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

  cancel(id: number): void {
    this.appointmentService.cancelAppointment(id).subscribe(() => {
      const canceledAppointment = this.patientAppointments.find(x => x.id === id);
      this.patientAppointments.splice(this.patientAppointments.indexOf(canceledAppointment), 1);
    }
      
    )
  }
}
