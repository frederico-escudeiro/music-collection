import { createAction, props } from "@ngrx/store";
import { Album, Artist } from "src/app/shared/types.model";


export const loadAllArtists = createAction(
    "[Home and ModifyAlbum Resolver] Load All Artists"
)

export const allArtistsLoaded = createAction(
    "[Load All Artists Effect] All Artists Loaded",
    props<{artists:Artist[]}>()
)

export const updateArtistWithNewAlbum = createAction(
    "[Add New Album Effect] Update Artist",
    props<{album:Album}>()
)
