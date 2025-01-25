import { createSelector } from "@ngrx/store";
import { AppStore, URLPathname } from "../services/appstore.service";

interface BIGSTORE{
  appdata: AppStore
}

const storeSelector = (store: BIGSTORE) => store.appdata


export const appStoreSelector = createSelector(
  storeSelector,
  (state) => state
);

export const selectedPageSelector = createSelector(
  storeSelector,
  (state) => state.selected
);

export const planCategorySelector = createSelector(
  storeSelector,
  (state) => state.planCategory
);

export const planTypeSelector = createSelector(
  storeSelector,
  (state) => state.planType
);


export const addonsSelector = createSelector(
  storeSelector,
  (state) => state.addons
)


export const pricesSelector = createSelector(
  storeSelector,
  (state) => state.prices
)
