import { AlbumsState } from "../reducers/albums.reducers";
import { FavoriteAlbumsState } from "../reducers/favorite-albums.reducers";
import { FavoriteSongsState } from "../reducers/favorite-songs.reducers";
import { ArtistsState } from "../reducers/home.reducers";
import { SongsState } from "../reducers/songs.reducers";

export interface AppState {
    artists: ArtistsState,
    albums: AlbumsState,
    songs: SongsState,
    favoriteAlbums: FavoriteAlbumsState,
    favoriteSongs: FavoriteSongsState
}

