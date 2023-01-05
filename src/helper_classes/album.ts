export interface Song {
    title: string,
    length: string
  }

export class SongFavorite implements Song{
    title: string = "";
    length: string = "";
    favorite?: boolean;

    constructor(title:string, length:string, favorite?:boolean){
        this.title = title;
        this.length = length;
        this.favorite = favorite;
    }
}

export interface Album {
    title: string,
    songs: Song[],
    description: string
}

export class AlbumFavorite implements Album {
    title: string = "";
    songs: Song[] = [];
    description: string = "";
    favorite?: boolean;

    constructor(title:string, songs:Song[], description:string, favorite?:boolean){
        this.title = title;
        this.songs = songs;
        this.description = description;
        this.favorite = favorite;
    }
    

}