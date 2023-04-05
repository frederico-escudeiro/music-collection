import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Album, Artist } from 'src/app/shared/types.model';
import { HttpService } from '../http/http.service';
import { GlobalConstants } from '../shared/global-constants.enum';
import { ModifyAlbumComponent } from '../shared/modify-album/modify-album.component';
import { AppState } from '../store/app.state';
import { selectAllArtists } from '../core/selectors/home.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  artists$!: Observable<Artist[]>;

  constructor(public dialog: MatDialog, private httpService: HttpService, private snackBar: MatSnackBar,
    private router: Router, private store: Store<AppState>) {

  }
  ngOnInit(): void {
    this.artists$ = this.store.pipe(select(selectAllArtists))
    //this.artists = this.httpService.getArtistsData().getValue();
  }

  openDialog(artist: Artist): void {
    const dialogRef = this.dialog.open(ModifyAlbumComponent, { disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      let message = "";
      if (result === undefined) {
        message = "No Album was created! :(";
      } else {
        let createdAlbum: Album = result.album;

        if (!this.httpService.existsDuplicateAlbum(createdAlbum.title)) {
          createdAlbum = this.httpService.filterDuplicateSongsInAlbum(createdAlbum);
          this.httpService.postNewAlbumData(createdAlbum, artist);
          message = "The Album '" + createdAlbum.title + "' was successfully created!";
        } else {
          message = "The Album '" + createdAlbum.title + "' was not created, as it already exists in this Artist.";
        }
      }

      let snackBarRef = this.snackBar.open(message);
      setTimeout(() => {
        snackBarRef.dismiss()
      },
        3000
      )
    });

  }

  onGoToAlbum(albumTitle: string) {
    this.router.navigate(['/' + GlobalConstants.MY_ALBUMS_STRING + '/' + albumTitle])
  }


}
