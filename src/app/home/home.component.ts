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
import { AppState } from '../core/store/app.reducers';
import { selectAllArtists } from '../core/selectors/home.selectors';
import { AlbumsActions } from '../core/store/action-types';

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
        this.store.dispatch(AlbumsActions.editAlbum({ album: createdAlbum }))
        //this.httpService.postNewAlbumData(createdAlbum);
        message = "The Album '" + createdAlbum.title + "' was successfully created!";
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
