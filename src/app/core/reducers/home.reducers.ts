import { createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Artist } from "src/app/shared/types.model";
import { ArtistsActions } from "src/app/core/store/action-types";

export interface ArtistsState extends EntityState<Artist> {

}

export const adapter = createEntityAdapter<Artist>();

export const initialArtistsState = adapter.getInitialState();

export const artistsReducer = createReducer(
    initialArtistsState,
    on(ArtistsActions.allArtistsLoaded,
        (state, action) => adapter.setAll(action.artists, state))
)

export const {
    selectAll
} = adapter.getSelectors();

