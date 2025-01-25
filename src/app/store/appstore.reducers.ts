import { createReducer, createSelector, on } from '@ngrx/store';
import { setSelectedPageNumber, saveToLocalStorage, setPlanCategory, setPlanType } from './appstore.actions';
import { AppStore, PATHNAMES, SELECTIONS, URLPathname } from '../services/appstore.service';

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


export const appStoreReducer = createReducer(
  initialState,
  on(saveToLocalStorage, (state) => {
    localStorage.setItem('appstore', JSON.stringify(state));
    return state;
  }),
  on(setSelectedPageNumber, (state, {selected}) => {
    return {...state, selected: selected}
  }),
  on(setPlanCategory, (state, {category}) => {
    return {...state, planCategory: category}
  }),
  on(setPlanType, (state, {planType}) => {
    return {...state, planType: planType}
  })
);


