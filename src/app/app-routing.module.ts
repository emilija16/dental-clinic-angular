import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentSchedulingComponent } from './appointment-scheduling/appointment-scheduling.component';
import { DentistAppointmentsComponent } from './dentist-appointments/dentist-appointments.component';
import { IdentificationDentistComponent } from './identification-dentist/identification-dentist.component';
import { IdentificationPatientComponent } from './identification-patient/identification-patient.component';
import { PatientAppointmentsComponent } from './patient-appointments/patient-appointments.component';


const routes: Routes = [
  {path: 'identification-patient', component: IdentificationPatientComponent},
  {path: 'identification-dentist', component: IdentificationDentistComponent},
  {path: 'appointment-scheduling', component: AppointmentSchedulingComponent},
  {path: 'dentist-appointments', component: DentistAppointmentsComponent},
  {path: 'patient-appointments/:jmbg', component: PatientAppointmentsComponent},
  {path: '', redirectTo: '/appointment-scheduling', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
