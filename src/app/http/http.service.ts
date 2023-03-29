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

  private allAlbums = new BehaviorSubject<{ album: Album, artistName: string }[]>(this.getAlbumsDataFromDB());

  get getAlbumsData() {
    return this.allAlbums.getValue();
  }

  addToAlbumsData(album: Album, artistName: string) {
    this.allAlbums.next([...this.allAlbums.getValue(), { album: album, artistName: artistName }]);
  }

  removeFromAlbumsData(albumTitle: string) {
    this.allAlbums.next(this.allAlbums.getValue().filter(album => album.album?.title !== albumTitle));
  }

  addToFavoriteSongs(album: Album, song: Song) {
    this.favoriteSongs.next([...this.favoriteSongs.getValue(), { album: album, song: song }]);
  }

  removeFromFavoriteSongs(songTitle: string) {
    this.favoriteSongs.next(this.favoriteSongs.getValue().filter(s => s.song?.title !== songTitle));
  }

  addToFavoriteAlbums(album: Album) {
    this.favoriteAlbums.next(this.favoriteAlbums.getValue().concat([album]));
    ('add album' + album.title);
    (this.favoriteAlbums.getValue());
  }

  removeFromFavoriteAlbums(albumTitle: string) {
    this.favoriteAlbums.next(
      this.favoriteAlbums.getValue().filter(a => a.title !== albumTitle)
    );
    ('remove album' + albumTitle);
    (this.favoriteAlbums.getValue());
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


  getAlbumsDataFromDB() {
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

  getAlbumByTitle(albumTitle: string): { artistName: string, album: Album, duration: string } {
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

  getSongByTitle(songTitle: string): { song: Song, artistName: string, albumTitle: string } | null {
    const foundSong = collectionArray.find(artist => {
      const foundAlbum = artist.albums?.find(album => album.songs?.some(song => song.title === songTitle));
      return foundAlbum !== undefined;
    });

    if (foundSong) {
      const foundAlbum = foundSong.albums?.find(album => album.songs.some(song => song.title === songTitle));
      const foundSongObj = foundAlbum?.songs.find(song => song.title === songTitle);
      let result: any;
      if (foundSongObj && foundAlbum) {
        result = {
          song: foundSongObj,
          artistName: foundSong.name,
          albumTitle: foundAlbum.title
        };
      }
      return result;
    }

    return null;
  }
  /*
    Gets favorites data from collectionArray.
  */
  getFavoritesData() {
    collectionArray.forEach(artist => {
      artist.albums.forEach(album => {
        if (album.favorite) {
          this.addToFavoriteAlbums(album);
        }
        album.songs.forEach(song => {
          if (song.favorite) {
            this.addToFavoriteSongs(album, song);
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

    let newSong: Song = {
      title: songToUpdate?.title !== undefined ? songToUpdate.title : '',
      length: songToUpdate?.length !== undefined ? songToUpdate.length : '',
      favorite: setFavorite
    }

    collectionArray.forEach(artist => {
      artist.albums.forEach(album => {
        album.songs.forEach(song => {
          if (song === songToUpdate) {

            album.songs[album.songs.indexOf(song)] = newSong;
            artist.albums[artist.albums.indexOf(album)] = album;
            collectionArray[collectionArray.indexOf(artist)] = artist;
            this.removeFromAlbumsData(album.title);
            this.addToAlbumsData(album, artist.name);
            if (setFavorite) {
              this.addToFavoriteSongs(album, newSong);
            } else {
              this.removeFromFavoriteSongs(newSong.title);
            }
          }
        })
      })
    })
  }

  updateWithEditedSong(input: { song: Song, albumTitle: string, artistName: string }, editedSong: Song, editedAlbum: Album, editedArtist: Artist) {
    if ((editedAlbum.title === input.albumTitle && editedArtist.name === input.artistName) || editedAlbum === null || editedArtist === null) {
      // Só os parâmetros dentro da song são editados:
      collectionArray.forEach(artist => {
        artist.albums.forEach(album => {
          album.songs.forEach(song => {
            if (song.title === input.song.title) {
              if (song.favorite) {
                this.removeFromFavoriteSongs(song.title);
                this.addToFavoriteSongs(album, editedSong);
              }
              album.songs[album.songs.indexOf(song)] = editedSong;
              artist.albums[artist.albums.indexOf(album)] = album;
              collectionArray[collectionArray.indexOf(artist)] = artist;
              this.removeFromAlbumsData(input.albumTitle);
              this.addToAlbumsData(album, artist.name);
            }
          })
        })
      })
    } else {
      this.deleteSong(input.song.title);
      collectionArray.forEach(artist => {
        if (artist.name === editedArtist.name) {
          artist.albums.forEach(album => {
            if (album.title === editedAlbum.title) {
              if (input.song.favorite) {
                this.addToFavoriteSongs(album, editedSong);
              }
              album.songs.push(editedSong);
              artist.albums[artist.albums.indexOf(album)] = album;
              collectionArray[collectionArray.indexOf(artist)] = artist;
              this.removeFromAlbumsData(input.albumTitle);
              this.addToAlbumsData(album, artist.name);
            }
          });
        }
      });
    }
  }

  updateWithEditedAlbum(input: any, editedAlbum: Album, editedArtist: Artist) {
    if (editedArtist.name === input.artistName || editedArtist === null) {
      collectionArray.forEach(artist => {
        artist.albums.forEach(album => {
          if (album.title === input.album.title) { 
            if (input.album.favorite) {
              this.removeFromFavoriteAlbums(input.album.title);
              this.addToFavoriteAlbums(editedAlbum);
            }
            editedAlbum.songs.map(editedSong => {
              for (let inputSong of input.album.songs) {
                if (inputSong.title === editedSong.title) {
                  editedSong.favorite = inputSong.favorite;
                  break;
                }
              }
            })
            artist.albums[artist.albums.indexOf(album)] = editedAlbum;
            collectionArray[collectionArray.indexOf(artist)] = artist;
            this.removeFromAlbumsData(input.album.title);
            this.addToAlbumsData(editedAlbum, artist.name);
          }
        })
      })
    } else {
      this.deleteAlbum(input.album.title);
      collectionArray.forEach(artist => {
        if (artist.name === input.artistName) {
          if (input.album.favorite) {
            this.addToFavoriteAlbums(editedAlbum);
          }
          artist.albums.push(editedAlbum);
          collectionArray[collectionArray.indexOf(artist)] = artist;
          this.addToAlbumsData(editedAlbum, artist.name);
        }
      })
    }
  }

  deleteAlbum(albumTitle: string) {
    collectionArray.forEach(artist => {
      artist.albums.forEach(album => {
        if (album.title === albumTitle) {
          artist.albums = artist.albums.filter(album => albumTitle !== album.title);
          collectionArray[collectionArray.indexOf(artist)] = artist;
          this.removeFromAlbumsData(album.title);
          if (album.favorite) {
            this.removeFromFavoriteAlbums(album.title);
          }
        }
      })
    })


  }


  deleteSong(songTitle: string) {
    collectionArray.forEach(artist => {
      artist.albums.forEach(album => {
        album.songs.forEach(song => {
          if (song.title === songTitle) {
            album.songs = album.songs.filter(song => songTitle !== song.title);
            artist.albums[artist.albums.indexOf(album)] = album;
            collectionArray[collectionArray.indexOf(artist)] = artist;
            this.removeFromAlbumsData(album.title);
            this.addToAlbumsData(album, artist.name);
            if (song.favorite) {
              this.removeFromFavoriteSongs(song.title);
            }
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
        if (album.title === albumToUpdate?.title) {
          artist.albums[artist.albums.indexOf(album)] = favoriteAlbum;
          collectionArray[collectionArray.indexOf(artist)] = artist;
          this.removeFromAlbumsData(album.title);
          this.addToAlbumsData(favoriteAlbum, artist.name);
          if (setFavorite) {
            this.addToFavoriteAlbums(favoriteAlbum);
          } else {
            this.removeFromFavoriteAlbums(favoriteAlbum.title);
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
        this.addToAlbumsData(newAlbum, selectedArtist.name);
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
    (createdAlbum);
    const existingSongs = new Set<string>();
    const filteredSongs = createdAlbum.songs.filter(song => {
      const isDuplicate = existingSongs.has(song.title);
      existingSongs.add(song.title);
      return !isDuplicate;
    });
    return { ...createdAlbum, songs: filteredSongs };
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