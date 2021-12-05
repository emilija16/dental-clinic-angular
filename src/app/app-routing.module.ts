import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentSchedulingComponent } from './appointment-scheduling/appointment-scheduling.component';
import { DentistAppointmentsComponent } from './dentist-appointments/dentist-appointments.component';
import { IdentificationComponent } from './identification/identification.component';
import { PatientAppointmentsComponent } from './patient-appointments/patient-appointments.component';


const routes: Routes = [
  {path: 'identification', component: IdentificationComponent},
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
