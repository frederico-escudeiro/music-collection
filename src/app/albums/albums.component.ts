import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/shared/global-constants.enum';
import { Album, Artist } from 'src/app/shared/types.model';
import { HttpService } from '../http/http.service';
import { ModifyAlbumComponent } from '../shared/modify-album/modify-album.component';
import { selectAlbumEntities, selectAllAlbums } from '../core/selectors/albums.selectors';
import { AlbumsActions } from '../core/store/action-types';
import { AppState } from '../core/store/app.reducers';
import { selectEntities } from '../core/reducers/albums.reducers';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  albums$!: Observable<Album[]>;

  constructor(
    private httpService: HttpService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.albums$ = this.store
      .pipe(
        select(selectAllAlbums)
      )
  }

  onLoadAlbum(album: Album) {
    console.log(album);
    console.log('/' + GlobalConstants.MY_ALBUMS_STRING + '/' + album.title + (album.favorite ? '/' + GlobalConstants.FAVORITE_STRING : ''));
    this.router.navigate(['/' + GlobalConstants.MY_ALBUMS_STRING + '/' + album.title + (album.favorite ? '/' + GlobalConstants.FAVORITE_STRING : '')]);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModifyAlbumComponent, { disableClose: true });

    dialogRef.afterClosed().subscribe((result: { album: Album }) => {
      let message = "";
      if (result === undefined || result.album === undefined) {
        message = "No Album was created! :(";
      } else {
        let createdAlbum: Album = result.album;
        this.store.dispatch(AlbumsActions.addNewAlbum({ album: createdAlbum }))
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

}