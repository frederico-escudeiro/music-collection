import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromFavoriteSongs from '../reducers/favorite-songs.reducers';
import { FavoriteSongsState } from "../reducers/favorite-songs.reducers";

export const selectFavoriteSongsState = createFeatureSelector<FavoriteSongsState>("favoriteAlbums");

export const selectFavoriteSongs = createSelector(
    selectFavoriteSongsState,
    fromFavoriteSongs.selectAll
)