import { createAction, props } from "@ngrx/store";
import { Album, Artist, Song } from "src/app/shared/types.model";

export const loadAllAlbums = createAction(
    "[Albums Resolver] Load All Albums"
)

export const allAlbumsLoaded = createAction(
    "[Load All Albums Effect] All Albums Loaded",
    props<{albums: Album[]}>()
)

export const addNewAlbum = createAction(
    "[Albums/Home Component] Add New Album",
    props<{album:Album}>()
)
export const editAlbum = createAction (
    "[Album Detail Component] Edit Album",
    props<{album:Album}>()
)

export const updateAlbumWithNewSong = createAction (
    "[Songs Edit Effect] Edit Album With New Song",
    props<{song:Song}>()
)

