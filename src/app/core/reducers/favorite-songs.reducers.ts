import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from "@ngrx/store";
import { FavoriteSongsActions } from "src/app/core/store/action-types";


export interface FavoriteSongsState extends EntityState<string>{
}

export const adapter = createEntityAdapter<string>();

export const initialFavoriteSongsState = adapter.getInitialState();

export const favoriteSongsReducer = createReducer(
    initialFavoriteSongsState,
    on(FavoriteSongsActions.favoriteSongsLoaded,
        (state, action)=> adapter.setAll(action.favoriteIds, state))
)

export const {selectAll} = adapter.getSelectors();