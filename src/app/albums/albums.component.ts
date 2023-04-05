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
import { selectAllAlbums } from '../core/selectors/albums.selectors';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  artistAlbums: { album: Album, artistName: string }[];
  albums$!: Observable<Album[]>;

  constructor(
    private httpService: HttpService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private store: Store) {
    this.artistAlbums = this.httpService.getAlbumsData;
  }

  ngOnInit(): void {
    this.albums$ = this.store
      .pipe(
        select(selectAllAlbums)
      )
  }

  onLoadAlbum(album: Album) {
    this.router.navigate(['/' + GlobalConstants.MY_ALBUMS_STRING + '/' + album.title + (album.favorite ? '/' + GlobalConstants.FAVORITE_STRING : '')]);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModifyAlbumComponent, { disableClose: true });

    dialogRef.afterClosed().subscribe((result: { artist: Artist, album: Album }) => {
      let message = "";
      if (result === undefined || result.album === undefined || result.artist === undefined) {
        message = "No Album was created! :(";
      } else {

        let createdAlbum: Album = result.album;

        if (!this.httpService.existsDuplicateAlbum(createdAlbum.title)) {
          createdAlbum = this.httpService.filterDuplicateSongsInAlbum(createdAlbum);
          this.httpService.postNewAlbumData(createdAlbum, result.artist);
          this.artistAlbums = this.httpService.getAlbumsData;
          message = "The Album '" + createdAlbum.title + "' was successfully created!";
        } else {
          message = "The Album '" + createdAlbum.title + "' was not created";
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
}
