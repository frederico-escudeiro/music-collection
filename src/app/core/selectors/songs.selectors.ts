import { createFeatureSelector, createSelector } from "@ngrx/store";
import { adapter, SongsState, selectAll } from "../reducers/songs.reducers";
import * as fromSongs from "../reducers/songs.reducers";

export const selectSongsState = createFeatureSelector<SongsState>("songs");

export const selectAllSongs = createSelector(
    selectSongsState,
    fromSongs.selectAll
)