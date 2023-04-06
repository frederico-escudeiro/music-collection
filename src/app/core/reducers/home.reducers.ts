import { createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Artist } from "src/app/shared/types.model";
import { AlbumsActions, ArtistsActions } from "src/app/core/store/action-types";

export interface ArtistsState extends EntityState<Artist> {

}

export const artistAdapter = createEntityAdapter<Artist>();

export const initialArtistsState = artistAdapter.getInitialState();

export const artistsReducer = createReducer(
    initialArtistsState,
    on(ArtistsActions.allArtistsLoaded,
        (state, { artists }) => artistAdapter.setAll(artists, state)),
    on(ArtistsActions.updateArtistWithNewAlbum,
        (state, { album }) => artistAdapter.updateOne(
            { id: album.parentId!, changes: { albums: [...state.entities[album.parentId!]?.albums!, album]} }, state))
)

export const {
    selectAll
} = artistAdapter.getSelectors();

