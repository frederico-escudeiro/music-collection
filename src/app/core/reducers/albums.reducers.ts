import { Album } from "src/app/shared/types.model";
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from "@ngrx/store";
import { AlbumsActions } from "src/app/core/store/action-types";


export interface AlbumsState extends EntityState<Album>{

}

export const albumsAdapter = createEntityAdapter<Album>();

export const initialAlbumsState = albumsAdapter.getInitialState();

export const albumsReducer = createReducer(
    initialAlbumsState,
    on(AlbumsActions.allAlbumsLoaded,
        (state, action)=> albumsAdapter.upsertMany(action.albums, state)),
    on(AlbumsActions.addNewAlbum,
        (state, action) => albumsAdapter.addOne(action.album, state)),
    on(AlbumsActions.editAlbum,
        (state,action) => albumsAdapter.upsertOne(action.album, state))
)

export const {selectAll, selectEntities} = albumsAdapter.getSelectors();