import { Routes } from '@angular/router';
import { FormInfoComponent } from './form-info/form-info.component';
import { FormPlanComponent } from './form-plan/form-plan.component';
import { FormAddonsComponent } from './form-addons/form-addons.component';
import { FormSummaryComponent } from './form-summary/form-summary.component';

export const routes: Routes = [
  {
    path: '', // TODO: change to initial screen before form pages
    component: FormInfoComponent,
  },
  {
    path: 'form/info',
    component: FormInfoComponent,
  },
  {
    path: 'form/plan',
    component: FormPlanComponent,
  },
  {
    path: 'form/add-ons',
    component: FormAddonsComponent,
  },
  {
    path: 'form/submit',
    component: FormSummaryComponent,
  },
];
