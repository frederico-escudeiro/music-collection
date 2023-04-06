import { createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Song } from "src/app/shared/types.model";
import { AlbumsActions, SongsActions } from "src/app/core/store/action-types";

export interface SongsState extends EntityState<Song> {

}

export const songsAdapter = createEntityAdapter<Song>();

export const initialSongsState = songsAdapter.getInitialState();

export const songsReducer = createReducer(
    initialSongsState,
    on(SongsActions.allSongsLoaded,
        (state, action) => songsAdapter.upsertMany(action.songs, state)),
    on(AlbumsActions.addNewAlbum,
        (state, { album }) => songsAdapter.addMany(album.songs, state)),
    on(AlbumsActions.editAlbum,
        (state, { album }) => songsAdapter.upsertMany(album.songs, state)),
    on(SongsActions.editSong,
        (state, {song}) => songsAdapter.updateOne({id: song.id!, changes: song}, state))
)

export const {
    selectAll
} = songsAdapter.getSelectors();

