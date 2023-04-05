import { createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Song } from "src/app/shared/types.model";
import { SongsActions } from "src/app/store/action-types";

export interface SongsState extends EntityState<Song> {

}

export const adapter = createEntityAdapter<Song>();

export const initialSongsState = adapter.getInitialState();

export const songsReducer = createReducer(
    initialSongsState,
    on(SongsActions.allSongsLoaded,
        (state, action) => adapter.setAll(action.songs, state))
)

export const {
    selectAll
} = adapter.getSelectors();

