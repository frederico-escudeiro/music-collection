import { createAction, props } from "@ngrx/store";
import { Album, Song } from "src/app/shared/types.model";


export const loadAllSongs = createAction(
    "[Songs Resolver] Load All Songs"
)

export const allSongsLoaded = createAction(
    "[Load All Songs Effect] All Songs Loaded",
    props<{songs:Song[]}>()
)

export const upsertSongsToAlbum = createAction(
    "[Add / Edit Album Effect] Add Songs",
    props<{songs:Song[]}>()
)

export const editSong = createAction(
    "[Song Component] Edit Song",
    props<{song:Song, album:Album}>()
)
