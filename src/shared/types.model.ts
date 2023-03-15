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

export class Album implements Album {
    constructor(title: string, description: string, songs: Song[]) {
        this.title = title;
        this.songs = songs;
        this.description = description;
    }
}


