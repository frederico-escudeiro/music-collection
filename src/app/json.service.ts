import { Injectable } from '@angular/core';
import jsonData from '../assets/json/artists_albuns.json';
import { Song, Album, SongFavorite, AlbumFavorite } from 'src/helper_classes/album';




interface Artist {
  name: string,
  albums: Album[]
}

let collectionArray: Artist[] = jsonData;

@Injectable({
  providedIn: 'root'
})
export class JsonService {



  getAlbumsData() {
    var artistAlbums: {
      album: Album,
      artistName: string
    }[] = []
    for (let artist of collectionArray) {
      for (let album of artist.albums) {
        artistAlbums.push({
          artistName: artist.name,
          album: album
        });
      }
    }
    return artistAlbums;
  }

  getAlbumByTitle(albumTitle: string) {
    for (let artist of collectionArray) {
      for (let album of artist.albums) {
        if (album.title === albumTitle) {
          return {
            artistName: artist.name,
            album: album,
            duration: this.getAlbumDuration(album.songs)
          };
        }
      }
    }
    var emptyAlbum: Album = {
      title:"No album with the title " + albumTitle + " was found",
      songs:[],
      description:"-"
    }
    return {
      artistName: "-",
      album: emptyAlbum,
      duration: "00:00"
    };
  }

  getAlbumDuration(songs: Song[]) {
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
      song:SongFavorite,
      artistName: string,
      albumTitle: string
    }[] = [];
    for (let artist of collectionArray) {
      for (let album of artist.albums) {
        for (let song of album.songs) {
          songs.push(
            {
              song:<SongFavorite>song,
              artistName: artist.name,
              albumTitle: album.title
            });
        }
      }
    }
    return songs;
  }

  getSongByTitle(songTitle: string) {
    for (let artist of collectionArray) {
      for (let album of artist.albums) {
        for (let song of album.songs)
          if (song.title === songTitle) {
            return {
              song: song,
              artistName: artist.name,
              albumTitle: album.title
            };
          }
      }
    }
    let emptySong:Song = {
      title:"No song with the title " + songTitle + " was found",
      length:"00:00"
    }
    return {
      song: emptySong,
      artistName: "-",
      albumTitle: "-"
    };
  }

  updateSongDataWithFavorite(songTitle: string, albumTitle: string, artistName: string,  isFavorite: boolean) {

    let songToUpdate = collectionArray
      .find(artist => artist.name === artistName)
      ?.albums.find(album => album.title === albumTitle)
      ?.songs.filter(song => song.title === songTitle)[0];

    let favoriteSong:SongFavorite = {
      title: songToUpdate?.title !== undefined ? songToUpdate.title : '',
      length: songToUpdate?.length !== undefined ? songToUpdate.length : '',
      favorite: isFavorite
    }

    for (let artist of collectionArray) {
      for (let album of artist.albums) {
        for (let song of album.songs) {
          if (song === songToUpdate) {
            album.songs[album.songs.indexOf(song)] = favoriteSong;
            artist.albums[artist.albums.indexOf(album)] = album;
            collectionArray[collectionArray.indexOf(artist)] = artist;
          }
        }
      }
    }
    console.log(favoriteSong);
    console.log(collectionArray);
  }

  updateAlbumDataWithFavorite(albumTitle: string, artistName: string, isFavorite: boolean) {

    let albumToUpdate = collectionArray
      .find(artist => artist.name === artistName)
      ?.albums.filter(album => album.title === albumTitle)[0];

    let favoriteAlbum:AlbumFavorite = {
      title: albumToUpdate?.title !== undefined ? albumToUpdate.title : '',
      description: albumToUpdate?.description !== undefined ? albumToUpdate.description : '',
      songs: albumToUpdate?.songs !== undefined ? albumToUpdate.songs : [],
      favorite: isFavorite
    }

    for (let artist of collectionArray) {
      for (let album of artist.albums) {
          if (album === albumToUpdate) {
            artist.albums[artist.albums.indexOf(album)] = favoriteAlbum;
            collectionArray[collectionArray.indexOf(artist)] = artist;
        }
      }
    }
    console.log(favoriteAlbum);
    console.log(collectionArray);
  }


}
