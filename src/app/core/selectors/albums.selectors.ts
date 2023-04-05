import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAlbums from '../reducers/albums.reducers';
import { AlbumsState } from "../reducers/albums.reducers";

export const selectAlbumsState = createFeatureSelector<AlbumsState>("albums");

export const selectAllAlbums = createSelector(
    selectAlbumsState,
    fromAlbums.selectAll
)

