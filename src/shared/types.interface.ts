export interface Artist {
    name: string,
    albums: Album[]
}

export interface Album {
    title: string,
    songs: Song[],
    description: string,
    favorite?: boolean;
}

export interface Song {
    title: string,
    length: string,
    favorite?: boolean
}

