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
    constructor(title: string, description: string, songs: Song[], favorite?:boolean) {
        this.title = title;
        this.songs = songs;
        this.description = description;
        this.favorite = favorite;
    }
}
export class Song implements Song {
    constructor(title: string, length: string, favorite?: boolean) {
        this.title = title;
        this.length = length;
        this.favorite = favorite;
    }
}

export class InputAlbum implements Album {
    artistName: string;
    title: string;
    songs: Song[];
    description: string;
    duration: string;

    constructor(title: string,
        songs: Song[],
        description: string,
        duration: string,
        artistName: string) {

        this.artistName = artistName;
        this.title = title;
        this.description = description;
        this.songs = songs;
        this.duration = duration;

    }

}


