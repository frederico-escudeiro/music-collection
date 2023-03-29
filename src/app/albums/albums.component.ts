import { Component, ComponentFactoryResolver } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/shared/global-constants.enum';
import { Album, Artist } from 'src/app/shared/types.model';
import { HttpService } from '../http/http.service';
import { AddAlbumComponent } from '../shared/add-album/add-album.component';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent {
  constructor(private httpService: HttpService, private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  artistAlbums = this.httpService.getAlbumsData();
  artists = this.httpService.getArtistsData();

  onLoadAlbumByTitle(album: Album) {
    this.router.navigate(['/' + GlobalConstants.MY_ALBUMS_STRING + '/' + album.title + (album.favorite ? '/' + GlobalConstants.FAVORITE_STRING : '')]);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddAlbumComponent, { data: this.artists, disableClose: true });

    dialogRef.afterClosed().subscribe((result) => {
      let message = "";
      if (result === undefined || result.album === undefined || result.artist === undefined) {
        message = "No Album was created! :(";
      } else {
        let createdAlbum: Album = result.album;

        if (!this.httpService.existsDuplicateAlbum(createdAlbum.title)) {
          createdAlbum = this.httpService.filterDuplicateSongsInAlbum(createdAlbum);
          this.httpService.postNewAlbumData(createdAlbum, result.artist);
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
