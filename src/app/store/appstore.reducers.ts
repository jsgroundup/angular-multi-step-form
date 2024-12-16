import { createReducer, createSelector, on } from '@ngrx/store';
import { getSelectedPageNumber, saveToLocalStorage } from './appstore.actions';
import { AppStore, AppstoreService, PATHNAMES, SELECTIONS, URLPathname } from '../services/appstore.service';

export const initialState: AppStore = {
  SELECTIONS : SELECTIONS,
  PATHNAMES : PATHNAMES,
  selected : SELECTIONS.INFO,
  planCategory:  'arcade',
  planType: 'monthly',
  detailsConfirmed: false,

  prices : {
    monthly: {arcade: 9, advanced: 12, pro: 15},
    yearly: {arcade: 90, advanced: 120, pro: 150},
  },

  addons : [
    {
      title: 'Online service',
      desc: 'Access to multiplayer games',
      price: 1,
      selected: false
    },
    {
      title: 'Larger storage',
      desc: 'Extra 1TB of cloud save',
      price: 2,
      selected: false
    },
    {
      title: 'Customizable profile',
      desc: 'Custom theme on your profile',
      price: 2,
      selected: false
    },
  ]
};

export class AppReducers extends AppstoreService {

  appStoreReducer = createReducer(
    initialState,
    on(saveToLocalStorage, (state=>{

      const userinfo = this.userPersonalInfo().getRawValue();
      const data = {
        planCategory: this.planCategory,
        planType: this.planType,
        info: {
          name: userinfo.name||'',
          email: userinfo.email||'',
          phone: userinfo.phone||''
        }
      }

      return {...state, ...data}
    })),
  );

  appStoreSelector = createSelector({
    query: getSelectedPageNumber,
    store: (state)=>{
      let url: URLPathname = this.router.url.toLowerCase() as any;
      return this.PATHNAMES[url]||this.SELECTIONS.INFO
    }
  })
}

