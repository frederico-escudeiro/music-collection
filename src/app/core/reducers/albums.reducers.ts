import { Album } from "src/app/shared/types.model";
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from "@ngrx/store";
import { AlbumsActions } from "src/app/core/store/action-types";


export interface AlbumsState extends EntityState<Album>{

}

export const adapter = createEntityAdapter<Album>();

export const initialAlbumsState = adapter.getInitialState();

export const albumsReducer = createReducer(
    initialAlbumsState,
    on(AlbumsActions.allAlbumsLoaded,
        (state, action)=> adapter.setAll(action.albums, state))
)

export const {selectAll} = adapter.getSelectors();