import { v4 as uuid } from 'uuid';

export interface Artist {
    id?:string,
    name: string,
    albums: Album[],
}

export interface Album {
    id?:string,
    parentId?:string,
    title: string,
    songs: Song[],
    description: string,
    favorite?: boolean;
}

export interface Song {
    id?:string,
    parentId?:string,
    title: string,
    length: string,
    favorite?: boolean
}

export class Album implements Album {
    constructor(title: string, description: string, songs: Song[], parentId?: string, favorite?:boolean) {
        this.title = title;
        this.songs = songs;
        this.description = description;
        this.favorite = favorite;
        this.id = uuid();
        this.parentId = parentId;
    }
}
export class Song implements Song {
    constructor(title: string, length: string, parentId?:string, favorite?: boolean) {
        this.title = title;
        this.length = length;
        this.favorite = favorite;
        this.id = uuid();
        this.parentId = parentId;
    }
}
