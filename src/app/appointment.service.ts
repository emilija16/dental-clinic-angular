import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Appointment } from "./appointment";
import { Dentist } from "./dentist";

@Injectable({
    providedIn: 'root'
  })
  export class AppointmentService {

    baseURL = "http://localhost:8080/appointments"
    weeklyAppointmentsURL = "http://localhost:8080/appointments/appointmentsWeekly"
    dentists = "http://localhost:8080/appointments/dentists"

    constructor(private http: HttpClient) {}

    save(appointment: Appointment): Observable<Object> {
        return this.http.post(`${this.baseURL}`, appointment);
    }

    getAllAppointments(): Observable<Appointment[]> {
      return this.http.get<Appointment[]>(this.baseURL);
    }

    cancelAppointment(id: number): Observable<HttpResponse<String>> {
      return this.http.delete<String>(`${this.baseURL}/${id}`, {observe: 'response'});
    }

    getWeeklyAppointments(): Observable<Appointment[]> {
      return this.http.get<Appointment[]>(this.weeklyAppointmentsURL)
    }

    getDentists(): Observable<Dentist[]> {
      return this.http.get<Dentist[]>(this.dentists);
    }
  }