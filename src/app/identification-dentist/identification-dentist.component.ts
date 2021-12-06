import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../appointment.service';
import { Dentist } from '../dentist';

@Component({
  selector: 'app-identification-dentist',
  templateUrl: './identification-dentist.component.html',
  styleUrls: ['./identification-dentist.component.scss']
})
export class IdentificationDentistComponent implements OnInit {

  jmbg: string;
  invalidLogin= false;
  dentistJmbg = "";

  constructor(private router: Router, private appointmnentService: AppointmentService) {}

  ngOnInit(): void {
    this.getDentistsFromService()
  }

  getDentistsFromService() {
    this.appointmnentService.getDentists().subscribe(data => {
      this.dentistJmbg = data[0].jmbg;
    })
  }

  onSubmit() {
    if(this.jmbg === this.dentistJmbg) {
      this.router.navigate(['dentist-appointments'])
    } else {
      this.invalidLogin = true;
    }
  }
}

