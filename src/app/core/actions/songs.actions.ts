import { createAction, props } from "@ngrx/store";
import { Song } from "src/app/shared/types.model";


export const loadAllSongs = createAction(
    "[Songs Resolver] Load All Songs"
)

export const allSongsLoaded = createAction(
    "[Load All Songs Effect] All Songs Loaded",
    props<{songs:Song[]}>()
)
