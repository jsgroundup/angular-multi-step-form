import { createSelector } from "@ngrx/store";
import { AppStore, URLPathname } from "../services/appstore.service";

export interface BIGSTORE{
  appdata: AppStore
}

const storeSelector = (store: BIGSTORE) => store.appdata


export const appStoreSelector = createSelector(
  storeSelector,
  (state) => state
);

export const selectedPageSelector = createSelector(
  appStoreSelector,
  (state) => state.selected
);

export const planCategorySelector = createSelector(
  appStoreSelector,
  (state) => state.planCategory
);

export const planTypeSelector = createSelector(
  appStoreSelector,
  (state) => state.planType
);


export const addonsSelector = createSelector(
  appStoreSelector,
  (state) => state.addons
)


export const pricesSelector = createSelector(
  appStoreSelector,
  (state) => state.prices
)
