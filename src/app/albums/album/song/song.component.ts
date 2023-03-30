import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from 'src/app/http/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalConstants } from 'src/app/shared/global-constants.enum';
import { MatDialog } from '@angular/material/dialog';
import { EditSongComponent } from './edit-song/edit-song.component';
import { BehaviorSubject } from 'rxjs';
import { Album, Artist, Song } from 'src/app/shared/types.model';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
  songTitle = "";
  albumTitle = ""
  song!: { song: Song; albumTitle: string; artistName: string; };
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.songTitle = this.route.snapshot.params[GlobalConstants.SONG_TITLE_STRING];
    this.albumTitle = this.route.snapshot.params[GlobalConstants.ALBUM_TITLE_STRING];
    this.route.params.subscribe((params: Params) => {
      this.songTitle = params[GlobalConstants.SONG_TITLE_STRING];
      this.albumTitle = params[GlobalConstants.ALBUM_TITLE_STRING];
      let songValid = this.httpService.getSongByTitle(this.songTitle);
      if (songValid) {
        this.song = songValid;
        this.isFavorite = !!this.song.song.favorite;
      } else {
        ("navigate to not-found");
        this.router.navigate(["/" + GlobalConstants.NOT_FOUND_STRING]);
      }
    })
  }

  onToggleFavorite() {
    this.isFavorite = !this.isFavorite;
    this.song.song.favorite = this.isFavorite;
    this.router.navigate([
      '/'
      + GlobalConstants.MY_ALBUMS_STRING
      + '/'
      + this.route.snapshot.paramMap.get(GlobalConstants.ALBUM_TITLE_STRING)
      + '/'
      + this.route.snapshot.paramMap.get(GlobalConstants.SONG_TITLE_STRING)
      + (this.isFavorite ? '/' + GlobalConstants.FAVORITE_STRING : '')]);

    this.httpService.updateSongDataWithFavorite
      (
        this.songTitle,
        this.song.albumTitle,
        this.song.artistName,
        this.isFavorite
      )
    this.favoriteToggleSnackBar();
  }

  favoriteToggleSnackBar() {
    let message = "The song '" + this.songTitle + "' was " + (this.isFavorite ? 'added to' : 'removed from') + " favorites!"
    let snackBarRef = this.snackBar.open(message);
    setTimeout(() => {
      snackBarRef.dismiss()
    },
      3000
    )
  }

  onEditSong() {
    (this.song.song.favorite);
    const dialogRef = this.dialog.open(EditSongComponent, { data: this.song, disableClose: true });

    dialogRef.afterClosed().subscribe((result: { song: Song, album: Album, artist: Artist }) => {
      let message = "";

      if (result !== undefined) {
        this.httpService.updateWithEditedSong(this.song, result.song, result.album, result.artist);

        message = "Song '" + result.song.title + "'  was successfully edited! :)";
        this.router.navigate(
          ['/' + GlobalConstants.MY_ALBUMS_STRING +
            '/' + result.album.title +
            '/' + result.song.title +
            (this.isFavorite ? '/' + GlobalConstants.FAVORITE_STRING : '')]);
      } else {
        message = "Song '" + this.song.song.title + "' was not edited. :("
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