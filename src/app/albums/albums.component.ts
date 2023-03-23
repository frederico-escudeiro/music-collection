import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/shared/global-constants.enum';
import { Album, Artist } from 'src/app/shared/types.model';
import { HttpService } from '../http/http.service';
import { AddAlbumComponent } from '../home/add-album/add-album.component';

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
    const dialogRef = this.dialog.open(AddAlbumComponent, { data: this.artists });

    dialogRef.afterClosed().subscribe(({ artist, album }) => {
      let message = "";
      if (artist !== undefined) {
        if (album === undefined) {
          message = "No Album was created! :(";
        } else {
          let createdAlbum: Album = album;

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
      }
    });

  }
}
