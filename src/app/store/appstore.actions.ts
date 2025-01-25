import { createAction, props } from '@ngrx/store';

export const saveToLocalStorage = createAction('[APPSTORE] save to local storage')
export const setSelectedPageNumber = createAction('[APPSTORE] set selected page number', props<{selected: number}>())
export const setPlanCategory = createAction(
  '[APPSTORE] set plan category',
  props<{ category: 'arcade' | 'advanced' | 'pro' }>()
);

export const setPlanType = createAction('[APPSTORE] set plan type', props<{ planType: 'monthly' | 'yearly' }>());

export const setAddon = createAction('[APPSTORE] set addon', props<{ index: number, selected: boolean }>());
