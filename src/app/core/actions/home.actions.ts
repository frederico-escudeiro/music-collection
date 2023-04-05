import { createAction, props } from "@ngrx/store";
import { Artist } from "src/app/shared/types.model";


export const loadAllArtists = createAction(
    "[Home Resolver] Load All Artists"
)

export const allArtistsLoaded = createAction(
    "[Load All Artists Effect] All Artists Loaded",
    props<{artists:Artist[]}>()
)
