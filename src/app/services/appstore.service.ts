import { inject, Injectable, signal, Signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

export const SELECTIONS = {INFO: 1, PLAN: 2, ADDONS: 3, SUMMARY: 4}

export const PATHNAMES: Record<URLPathname, number> = {
  '/': SELECTIONS.INFO,
  '/form/info': SELECTIONS.INFO,
  '/form/plan': SELECTIONS.PLAN,
  '/form/add-ons': SELECTIONS.ADDONS,
  '/form/submit': SELECTIONS.SUMMARY,
};



@Injectable({
  providedIn: 'root',
})
export class AppstoreService {
  constructor() {
    // Read form progress from local storage and resume from where user left
    try {
      let storedProgress = window.localStorage.getItem('formdata');
      if (storedProgress) {
        const progress = JSON.parse(storedProgress) as AppstoreService & {
          info: FormValue;
        };
        this.planCategory = progress.planCategory;
        this.planType = progress.planType;
        this.userPersonalInfo().controls.name.setValue(progress.info.name);
        this.userPersonalInfo().controls.email.setValue(progress.info.email);
        this.userPersonalInfo().controls.phone.setValue(progress.info.phone);
        this.router.url;
      }
    } catch (error) {}

    // Save user info from input fields in the local storage
    this.userPersonalInfo().valueChanges.subscribe((info) => {
      this.saveToLocalStorage();
    });
  }

  router = inject(Router);

  isAboutLeavingPage = false;

  SELECTIONS = SELECTIONS;
  PATHNAMES = PATHNAMES;
  selected = SELECTIONS.INFO;
  planCategory: 'arcade' | 'advanced' | 'pro' = 'arcade';
  planType: 'yearly' | 'monthly' = 'monthly';
  detailsConfirmed = false;

  prices = {
    monthly: { arcade: 9, advanced: 12, pro: 15 },
    yearly: { arcade: 90, advanced: 120, pro: 150 },
  };

  addons = [
    {
      title: 'Online service',
      desc: 'Access to multiplayer games',
      price: 1,
      selected: false,
    },
    {
      title: 'Larger storage',
      desc: 'Extra 1TB of cloud save',
      price: 2,
      selected: false,
    },
    {
      title: 'Customizable profile',
      desc: 'Custom theme on your profile',
      price: 2,
      selected: false,
    },
  ];

  userPersonalInfo = signal(
    new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(64),
        Validators.pattern(/(\.[^\.]+)$/),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(10),
        Validators.pattern(/(\+ [0-9]{3} [0-9]{3} [0-9]+)|(\+[0-9]{10}[0-9]*)/),
      ]),
    })
  );

  saveToLocalStorage() {
    const userinfo = this.userPersonalInfo().getRawValue();
    window.localStorage.setItem(
      'formdata',
      JSON.stringify({
        planCategory: this.planCategory,
        planType: this.planType,
        info: {
          name: userinfo.name || '',
          email: userinfo.email || '',
          phone: userinfo.phone || '',
        },
      })
    );
  }

  getSelectedPageNumber() {
    let url: URLPathname = this.router.url.toLowerCase() as any;
    return this.PATHNAMES[url] || this.SELECTIONS.INFO;
  }

  navigateTo(selection: typeof SELECTIONS[keyof typeof SELECTIONS], fromNavBar?: boolean) {
    const paths = Object.keys(this.PATHNAMES);
    if(selection === SELECTIONS.PLAN){
      // Ensure all fields of form info is filled
      this.isAboutLeavingPage = true;
      if(!fromNavBar&&this.formInfoHasErrors()) {
        return;
      }
    }
    this.selected = selection;
    this.saveToLocalStorage();
    this.router.navigate([paths[selection]]);
  }

  formInfoHasErrors(){
    return this.userPersonalInfo().invalid;
  }
}


export type FormValue = {
  name: string | null;
  email: string | null;
  phone: string | null;
}

export type PersonalInfo = FormGroup<{
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
}>

export type URLPathname = '/'|'/form/plan'|'/form/add-ons'|'/form/submit'|'/form/info'


export interface AppStore {

  SELECTIONS: typeof SELECTIONS
  PATHNAMES: typeof PATHNAMES
  selected: typeof SELECTIONS.INFO
  planCategory:  'arcade'|'advanced'|'pro'
  planType: 'yearly'|'monthly'
  detailsConfirmed: boolean

  prices: {
    monthly: {arcade: number, advanced: number, pro: number},
    yearly: {arcade: number, advanced: number, pro: number},
  }

  addons: {
    title: string,
    desc: string,
    price: number,
    selected: boolean
  }[]
}
