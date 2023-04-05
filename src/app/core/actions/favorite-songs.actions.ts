import { createAction, props } from "@ngrx/store";

export const loadFavoriteSongs = createAction(
    "[Favorites Resolver] Load Favorite Songs"
)

export const favoriteSongsLoaded = createAction(
    "[Load Favorite Songs Effect] Favorite Songs Loaded",
    props<{favoriteIds: string[]}>()
)