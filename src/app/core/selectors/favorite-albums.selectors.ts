import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromFavoriteAlbums from '../reducers/favorite-albums.reducers';
import { FavoriteAlbumsState } from "../reducers/favorite-albums.reducers";

export const selectFavoriteAlbumsState = createFeatureSelector<FavoriteAlbumsState>("favoriteAlbums");

export const selectFavoriteAlbums = createSelector(
    selectFavoriteAlbumsState,
    fromFavoriteAlbums.selectAll
)