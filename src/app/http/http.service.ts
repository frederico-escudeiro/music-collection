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

  getArtistByName(artistName: string): Artist | null {
    let foundArtist: Artist | undefined;
    let result: any = null;
    foundArtist = collectionArray.find(artist => artist.name === artistName);
    if (foundArtist !== undefined) {
      result = foundArtist;
    }
    return result;
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
            if (setFavorite) {
              this.favoriteSongs.next(
                this.favoriteSongs.getValue().concat({ album: album, song: song })
              );
            } else {
              this.favoriteSongs.next(
                this.favoriteSongs.getValue().filter(songToUnfavorite => songToUnfavorite.song?.title !== songTitle)
              );
            }
          }
        })
      })
    })
  }

  updateWithEditedSong(input: any, editedSong: Song, editedAlbum: Album, editedArtist: Artist) {

    if (editedAlbum.title === input.albumTitle && editedArtist.name === input.artistName) {
      //Só os parâmetros dentro da song são editados:
      collectionArray.forEach(artist => {
        artist.albums.forEach(album => {
          album.songs.forEach(song => {
            if (song.title === input.song.title) {
              album.songs[editedAlbum.songs.indexOf(song)] = editedSong;
              artist.albums[editedArtist.albums.indexOf(album)] = album;
              collectionArray[collectionArray.indexOf(artist)] = artist;
              console.log(collectionArray);
            }
          })
        })
      })
    } else {
      //Se o album e o artista forem alterados (ou seja se a song mover-se para outro album e outro artista):

      this.deleteSong(input.song.title);
      collectionArray.forEach(artist => {
        if (artist.name === editedArtist.name) {
          artist.albums.forEach(album => {
            if (album.title === editedAlbum.title) {
              album.songs.push(editedSong);
              artist.albums[artist.albums.indexOf(album)] = album;
            }
          })
          collectionArray[collectionArray.indexOf(artist)] = artist;
        }
      })
      console.log(collectionArray);
    }


  }

  deleteSong(songTitle: string) {
    collectionArray.forEach(artist => {
      artist.albums.forEach(album => {
        album.songs.forEach(song => {
          if (song.title === songTitle) {
            album.songs = album.songs.filter(song => songTitle !== song.title);
            artist.albums[artist.albums.indexOf(album)] = album;
            collectionArray[collectionArray.indexOf(artist)] = artist
          }
        })
      })
    })


  }

  updateAlbumDataWithFavorite(albumTitle: string, artistName: string, setFavorite: boolean) {
    let albumToUpdate = collectionArray
      .find(artist => artist.name === artistName)?.albums
      .filter(album => album.title === albumTitle)[0];

    let favoriteAlbum: Album = {
      title: albumToUpdate?.title ? albumToUpdate.title : '',
      description: albumToUpdate?.description ? albumToUpdate.description : '',
      songs: albumToUpdate?.songs ? albumToUpdate.songs : [],
      favorite: setFavorite
    }

    collectionArray.forEach(artist => {
      artist.albums.forEach(album => {
        if (album === albumToUpdate) {
          artist.albums[artist.albums.indexOf(album)] = favoriteAlbum;
          collectionArray[collectionArray.indexOf(artist)] = artist;
          if (setFavorite) {
            this.favoriteAlbums.next(
              this.favoriteAlbums.getValue().concat(album)
            );
          } else {
            this.favoriteAlbums.next(
              this.favoriteAlbums.getValue().filter(albumToUnfavorite => albumToUnfavorite.title !== albumTitle)
            );
          }
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