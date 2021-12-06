import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificationDentistComponent } from './identification-dentist.component';

describe('IdentificationDentistComponent', () => {
  let component: IdentificationDentistComponent;
  let fixture: ComponentFixture<IdentificationDentistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentificationDentistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificationDentistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
