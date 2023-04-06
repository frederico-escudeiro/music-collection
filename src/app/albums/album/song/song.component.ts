import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from 'src/app/http/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalConstants } from 'src/app/shared/global-constants.enum';
import { MatDialog } from '@angular/material/dialog';
import { EditSongComponent } from './edit-song/edit-song.component';
import { BehaviorSubject } from 'rxjs';
import { Album, Artist, Song } from 'src/app/shared/types.model';
import { AppState } from 'src/app/core/store/app.reducers';
import { select, Store } from '@ngrx/store';
import { selectAllSongs } from 'src/app/core/selectors/songs.selectors';
import { SongsActions } from 'src/app/core/store/action-types';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
  songTitle = "";
  albumTitle = "";
  artistName = "Im nothing yet";
  song!: Song;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private store: Store<AppState>) {

  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.songTitle = params[GlobalConstants.SONG_TITLE_STRING];
      this.albumTitle = params[GlobalConstants.ALBUM_TITLE_STRING];
      this.store.pipe(select(selectAllSongs)).subscribe(songs => {
        this.song = songs.find(song => song.title === this.songTitle)!
      });
      this.isFavorite = !!this.song.favorite;
      //let songValid = this.httpService.getSongByTitle(this.songTitle);

    })
  }

  onToggleFavorite() {
    this.isFavorite = !this.isFavorite;
    this.song.favorite = this.isFavorite;
    this.router.navigate([
      '/'
      + GlobalConstants.MY_ALBUMS_STRING
      + '/'
      + this.route.snapshot.paramMap.get(GlobalConstants.ALBUM_TITLE_STRING)
      + '/'
      + this.route.snapshot.paramMap.get(GlobalConstants.SONG_TITLE_STRING)
      + (this.isFavorite ? '/' + GlobalConstants.FAVORITE_STRING : '')]);



    // this.httpService.updateSongDataWithFavorite
    //   (
    //     this.songTitle,
    //     this.song.albumTitle,
    //     this.song.artistName,
    //     this.isFavorite
    //   )

    //put favorite song in store
    this.favoriteToggleSnackbar();
  }

  favoriteToggleSnackbar() {
    let message = "The song '" + this.songTitle + "' was " + (this.isFavorite ? 'added to' : 'removed from') + " favorites!"
    let snackBarRef = this.snackBar.open(message);
    setTimeout(() => {
      snackBarRef.dismiss()
    },
      3000
    )
  }

  onEditSong() {
    const dialogRef = this.dialog.open(EditSongComponent, { data: this.song, disableClose: true });

    dialogRef.afterClosed().subscribe((result: { song: Song, album: Album, artist: Artist }) => {
      let message = "";

      if (result === undefined) {
        message = "Song '" + this.song.title + "' was not edited. :("

      } else {
        //this.httpService.updateWithEditedSong(this.song, result.song, result.album, result.artist);

        this.store.dispatch(SongsActions.editSong({ album: result.album, song: result.song }))

        message = "Song '" + result.song.title + "'  was successfully edited! :)";
        this.router.navigate(
          ['/' + GlobalConstants.MY_ALBUMS_STRING +
            '/' + result.album.title +
            '/' + result.song.title +
            (this.isFavorite ? '/' + GlobalConstants.FAVORITE_STRING : '')]);
      }
      let snackBarRef = this.snackBar.open(message);
      setTimeout(() => {
        snackBarRef.dismiss()
      },
        3000
      )
    });

  }

}