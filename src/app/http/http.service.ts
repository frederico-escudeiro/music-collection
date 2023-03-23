import { Injectable } from '@angular/core';
import jsonData from '../../assets/json/artists_albuns.json';
import { Song, Album, Artist } from 'src/app/shared/types.model';
import { BehaviorSubject } from 'rxjs';



let collectionArray: Artist[] = jsonData;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private favoriteSongs = new BehaviorSubject<{ album: Album, song?: Song }[]>([]);
  private favoriteAlbums = new BehaviorSubject<Album[]>([]);

  get getFavoriteSongs() {
    return this.favoriteSongs.getValue();
  }

  get getFavoriteAlbums() {
    return this.favoriteAlbums.getValue();
  }

  getArtistsData() {
    return collectionArray;
  }

  getAlbumsData() {
    var artistAlbums: {
      album: Album,
      artistName: string
    }[] = []

    collectionArray.forEach(artist => {
      artist.albums.forEach(album => {
        artistAlbums.push({
          artistName: artist.name,
          album: album
        });
      })
    })
    return artistAlbums;
  }

  getAlbumByTitle(albumTitle: string): Album | null {
    let foundAlbum: Album | undefined;
    let result: any = null;

    collectionArray.forEach(artist => {
      foundAlbum = artist.albums.find(album => album.title === albumTitle);
      if (foundAlbum !== undefined) {
        result = {
          artistName: artist.name,
          album: foundAlbum,
          duration: this.getAlbumDuration(foundAlbum!.songs)
        }
      }

    });
    return result;
  }



  getSongData() {
    var songs: {
      song: Song,
      artistName: string,
      albumTitle: string
    }[] = [];

    collectionArray.forEach(artist => {
      artist.albums.forEach(album => {
        album.songs.forEach(song => {
          songs.push(
            {
              song: <Song>song,
              artistName: artist.name,
              albumTitle: album.title
            });
        })
      })
    })
    return songs;
  }

  getSongByTitle(songTitle: string) {
    let foundSong: Song | undefined;
    let result: any = null;

    collectionArray.forEach(artist => {
      artist.albums.forEach(album => {
        foundSong = album.songs.find(song => song.title === songTitle);
        if (foundSong !== undefined) {
          result = {
            song: foundSong,
            artistName: artist.name,
            albumTitle: album.title
          }
        }
      })
    });
    return result;
  }
  /*
    Gets favorites data from collectionArray.
  */
  getFavoritesData() {
    collectionArray.forEach(artist => {
      artist.albums.forEach(album => {
        if (album.favorite) {
          this.favoriteAlbums.next(
            this.favoriteAlbums.getValue().concat(album)
          )
        }
        album.songs.forEach(song => {
          if (song.favorite) {
            this.favoriteSongs.next(
              this.favoriteSongs.getValue().concat({ album: album, song: song }));
          }
        })
      })
    }
    )
  }

  updateSongDataWithFavorite(songTitle: string, albumTitle: string, artistName: string, setFavorite: boolean) {

    let songToUpdate = collectionArray
      .find(artist => artist.name === artistName)
      ?.albums.find((album: Album) => album.title === albumTitle)
      ?.songs.filter((song: Song) => song.title === songTitle)[0];

    if (songToUpdate === undefined) {
      return;
    }

    let favoriteSong: Song = {
      title: songToUpdate?.title !== undefined ? songToUpdate.title : '',
      length: songToUpdate?.length !== undefined ? songToUpdate.length : '',
      favorite: setFavorite
    }

    collectionArray.forEach(artist => {
      artist.albums.forEach(album => {
        album.songs.forEach(song => {
          if (song === songToUpdate) {
            album.songs[album.songs.indexOf(song)] = favoriteSong;
            artist.albums[artist.albums.indexOf(album)] = album;
            collectionArray[collectionArray.indexOf(artist)] = artist;
            this.favoriteSongs.next(
              this.favoriteSongs.getValue().concat({ album: album, song: song })
            );
          }
        })
      })
    })
  }

  updateAlbumDataWithFavorite(albumTitle: string, artistName: string, isFavorite: boolean) {
    let albumToUpdate = collectionArray
      .find(artist => artist.name === artistName)?.albums
      .filter(album => album.title === albumTitle)[0];

    let favoriteAlbum: Album = {
      title: albumToUpdate?.title ? albumToUpdate.title : '',
      description: albumToUpdate?.description ? albumToUpdate.description : '',
      songs: albumToUpdate?.songs ? albumToUpdate.songs : [],
      favorite: isFavorite
    }

    collectionArray.forEach(artist => {
      artist.albums.forEach(album => {
        if (album === albumToUpdate) {
          artist.albums[artist.albums.indexOf(album)] = favoriteAlbum;
          collectionArray[collectionArray.indexOf(artist)] = artist;
          this.favoriteAlbums.next(
            this.favoriteAlbums.getValue().concat(album)
          );
        }
      })
    });
  }

  postNewAlbumData(newAlbum: Album, selectedArtist: Artist) {

    collectionArray.forEach(artist => {
      if (selectedArtist === artist) {
        artist.albums.push(newAlbum);
        collectionArray[collectionArray.indexOf(artist)] = artist;
      }
    })
  }

  existsDuplicateAlbum(albumTitle: string): boolean {
    let existsAlbum = false;
    collectionArray.forEach(artist => {
      artist.albums.forEach(album => {
        if (album.title === albumTitle) {
          existsAlbum = true;
        }
      })
    })
    return existsAlbum;
  }

  filterDuplicateSongsInAlbum(createdAlbum: Album): Album {
    collectionArray.map(artist => {
      artist.albums.map(album => {
        album.songs.map(song => {
          createdAlbum.songs = createdAlbum.songs.filter(s => s.title !== song.title);
        })
      })
    })
    return createdAlbum;

  }

  getAlbumDuration(songs: Song[]) {
    let totalSeconds = 0;
    let result = "";
    songs.forEach(song => {
      let tempTime = song.length.split(":");
      totalSeconds = totalSeconds + ((+tempTime[0]) * 60 + (+tempTime[1]));
    })
    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    result = hours + ":" + minutes + ":" + seconds;
    return result;
  }
}