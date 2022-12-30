import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { Injectable } from '@angular/core';
import collectionData from '../assets/json/artists_albuns.json';



@Injectable({
  providedIn: 'root'
})
export class JsonService {

  postJsonData() {
    return collectionData;
  }

  getArtistData() {
    var artists: any[] = []
    for (let artist in collectionData) {
      artists.push(collectionData[artist]);
    }
    return artists;
  }

  getAlbumsData() {
    var artistAlbums: {
      albumTitle: string,
      artistName: string
    }[] = []
    for (let artist of collectionData) {
      for (let album of artist.albums) {
        artistAlbums.push({
          albumTitle: album.title,
          artistName: artist.name
        });
      }
    }
    return artistAlbums;
  }

  getAlbumByTitle(albumTitle: string) {
    for (let artist of collectionData) {
      for (let album of artist.albums) {
        if (album.title === albumTitle) {
          return {
            title: album.title,
            songs: album.songs,
            description: album.description,
            artistName: artist.name,
            duration: this.getAlbumDuration(album.songs)
          };
        }
      }
    }
    return {
      title: "No album with the title " + albumTitle + " was found",
      songs: [],
      description: "-",
      duration: "00:00",
      artistName: "-"
    };
  }

  getAlbumDuration(songs: { title: string, length: string }[]) {
    let totalSeconds = 0;
    let result = "";
    for (let song of songs) {
      let tempTime = song.length.split(":");
      totalSeconds = totalSeconds + ((+tempTime[0]) * 60 + (+tempTime[1]));
    }
    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    result = hours + ":" + minutes + ":" + seconds;
    return result;
  }

  getSongData() {
    var songs: {
      songTitle: string,
      songLength: string,
      artistName: string,
      albumTitle: string
    }[] = [];
    for (let artist of collectionData) {
      for (let album of artist.albums) {
        for (let song of album.songs) {
          songs.push(
            {
              songTitle: song.title,
              songLength: song.length,
              artistName: artist.name,
              albumTitle: album.title
            });
        }
      }
    }
    return songs;
  }

  getSongByTitle(songTitle: string) {
    for (let artist of collectionData) {
      for (let album of artist.albums) {
        for (let song of album.songs)
          if (song.title === songTitle) {
            return {
              songTitle: song.title,
              songLength: song.length,
              artistName: artist.name,
              albumTitle: album.title
            };
          }
      }
    }
    return {
      songTitle: "No song with the title " + songTitle + " was found",
      songLength: "00:00",
      artistName: "-",
      albumTitle: "-"
    };
  }

  updateSongDataWithFavorite(songTitle: string) {
    for (let artist of collectionData) {
      for (let album of artist.albums) {
        for (let song of album.songs)
          if (song.title === songTitle) {
            if(!song.hasOwnProperty("favorite")){
              Object.defineProperty(song,'favorite',{
                value:true,
                writable:true
              });
            }
          }
      }
    }
  }


  putUpdatedData(data: string) {
    //write in file

  }
}
