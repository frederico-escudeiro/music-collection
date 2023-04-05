import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from "@ngrx/store";
import { FavoriteAlbumsActions } from "src/app/core/store/action-types";


export interface FavoriteAlbumsState extends EntityState<string>{
}

export const adapter = createEntityAdapter<string>();

export const initialFavoriteAlbumsState = adapter.getInitialState();

export const favoriteAlbumsReducer = createReducer(
    initialFavoriteAlbumsState,
    on(FavoriteAlbumsActions.favoriteAlbumsLoaded,
        (state, action)=> adapter.setAll(action.favoriteIds, state))
)

export const {selectAll} = adapter.getSelectors();