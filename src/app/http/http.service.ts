import { Injectable } from '@angular/core';
import jsonData from '../../assets/json/artists_albuns.json';
import { Song, Album, Artist } from 'src/app/shared/types.model';
import { GlobalConstants } from 'src/app/shared/global-constants.enum';



let collectionArray: Artist[] = jsonData;

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  getArtistsData() {
    return collectionArray;
  }

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
    return null;
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
      song: Song,
      artistName: string,
      albumTitle: string
    }[] = [];
    for (let artist of collectionArray) {
      for (let album of artist.albums) {
        for (let song of album.songs) {
          songs.push(
            {
              song: <Song>song,
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
    return null;
  }

  getFavoritesData() {
    let favorites: (
      {
        type: string,
        songTitle?: string,
        albumTitle: string,
        artistName: string
      })[] = [];

    for (let artist of collectionArray) {
      for (let album of artist.albums) {
        if (album.favorite) {
          favorites.push(
            {
              type: GlobalConstants.ALBUM_TYPE_STRING,
              albumTitle: album.title,
              artistName: artist.name
            });
        }
        for (let song of album.songs) {
          if (song.favorite) {
            favorites.push(
              {
                type: GlobalConstants.SONG_TYPE_STRING,
                songTitle: song.title,
                albumTitle: album.title,
                artistName: artist.name
              });
          }
        }
      }
    }
    return favorites;
  }

  postSongDataWithFavorite(songTitle: string, albumTitle: string, artistName: string, setFavorite: boolean) {

    let songToUpdate = collectionArray
      .find(artist => artist.name === artistName)
      ?.albums.find((album: Album) => album.title === albumTitle)
      ?.songs.filter((song: Song) => song.title === songTitle)[0];

    let favoriteSong: Song = {
      title: songToUpdate?.title !== undefined ? songToUpdate.title : '',
      length: songToUpdate?.length !== undefined ? songToUpdate.length : '',
      favorite: setFavorite
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
  }

  postAlbumDataWithFavorite(albumTitle: string, artistName: string, isFavorite: boolean) {
    let albumToUpdate = collectionArray
      .find(artist => artist.name === artistName)?.albums
      .filter(album => album.title === albumTitle)[0];

    let favoriteAlbum: Album = {
      title: albumToUpdate?.title ? albumToUpdate.title : '',
      description: albumToUpdate?.description ? albumToUpdate.description : '',
      songs: albumToUpdate?.songs ? albumToUpdate.songs : [],
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
  }

  postNewAlbumData(newAlbum: Album, selectedArtist: Artist) {
    for (let artist of collectionArray) {
      if (selectedArtist === artist) {
        artist.albums.push(newAlbum);
        collectionArray[collectionArray.indexOf(artist)] = artist;
      }
    }
  }

  existsDuplicateAlbum(albumTitle: string): boolean {
    for (let artist of collectionArray) {
      for (let album of artist.albums) {
        if (album.title === albumTitle) {
          return true;
        }
      }
    }
    return false;
  }

  filterDuplicateSongsInAlbum(createdAlbum: Album): Album {
    for (let artist of collectionArray) {
      for (let album of artist.albums) {
        for (let song of album.songs) {
          createdAlbum.songs = createdAlbum.songs.filter(s => s.title !== song.title);
        }
      }
    }
    return createdAlbum;

  }
}