import { createAction, props } from "@ngrx/store";
import { Album } from "src/app/shared/types.model";

export const loadAllAlbums = createAction(
    "[Albums Resolver] Load All Albums"
)

export const allAlbumsLoaded = createAction(
    "[Load All Albums Effect] All Albums Loaded",
    props<{albums: Album[]}>()
)