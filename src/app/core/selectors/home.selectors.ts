import { createFeatureSelector, createSelector } from "@ngrx/store";
import { adapter, ArtistsState, selectAll } from "../reducers/home.reducers";
import * as fromArtists from "../reducers/home.reducers";

export const selectArtistsState = createFeatureSelector<ArtistsState>("artists");

export const selectAllArtists = createSelector(
    selectArtistsState,
    fromArtists.selectAll
)