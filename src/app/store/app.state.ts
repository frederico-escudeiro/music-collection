import { AlbumsState } from "../core/reducers/albums.reducers";
import { ArtistsState } from "../core/reducers/home.reducers";
import { SongsState } from "../core/reducers/songs.reducers";

export interface AppState {
    artists: ArtistsState,
    albums: AlbumsState,
    songs: SongsState
}

