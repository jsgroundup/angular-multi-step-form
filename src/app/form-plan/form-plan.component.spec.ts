import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPlanComponent } from './form-plan.component';

describe('FormPlanComponent', () => {
  let component: FormPlanComponent;
  let fixture: ComponentFixture<FormPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
