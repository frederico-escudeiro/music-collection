import { createAction, props } from "@ngrx/store";

export const loadFavoriteAlbums = createAction(
    "[Favorites Resolver] Load Favorite Albums"
)

export const favoriteAlbumsLoaded = createAction(
    "[Load Favorite Albums Effect] Favorite Albums Loaded",
    props<{favoriteIds: string[]}>()
)