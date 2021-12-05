import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentSchedulingComponent } from './appointment-scheduling/appointment-scheduling.component';
import { IdentificationComponent } from './identification/identification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppointmentService } from './appointment.service';
import { DentistAppointmentsComponent } from './dentist-appointments/dentist-appointments.component';
import { PatientAppointmentsComponent } from './patient-appointments/patient-appointments.component';
import { ToggleButtonComponent } from './toggle-button/toggle-button.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    AppointmentSchedulingComponent,
    IdentificationComponent,
    DentistAppointmentsComponent,
    PatientAppointmentsComponent,
    ToggleButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AppointmentService, DatePipe],
  bootstrap: [AppComponent,]
})
export class AppModule { }
