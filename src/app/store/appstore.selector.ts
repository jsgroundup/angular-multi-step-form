import { createSelector } from "@ngrx/store";
import { getSelectedPageNumber } from "./appstore.actions";
import { AppStore, URLPathname } from "../services/appstore.service";

interface BIGSTORE{
  appdata: AppStore
}

const storeSelector = (store: BIGSTORE) => store.appdata


export const appStoreSelector = createSelector(
  storeSelector,
  (state) => state
);
