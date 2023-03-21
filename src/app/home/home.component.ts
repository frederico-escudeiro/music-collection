import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Album, Artist } from 'src/app/shared/types.model';
import { HttpService } from '../http/http.service';
import { AddAlbumComponent } from './add-album/add-album.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  artists: Artist[];

  constructor(public dialog: MatDialog, private httpService: HttpService, private snackBar: MatSnackBar) {
    this.artists = this.httpService.getArtistsData();
  }

  openDialog(artist: Artist): void {
    const dialogRef = this.dialog.open(AddAlbumComponent, { data: artist });

    dialogRef.afterClosed().subscribe(result => {
      let createdAlbum:Album = result;
      let message = "";
      if (createdAlbum !== undefined && !this.httpService.existsDuplicateAlbum(createdAlbum.title)) {
        createdAlbum = this.httpService.filterDuplicateSongsInAlbum(createdAlbum);
        this.httpService.postNewAlbumData(createdAlbum, artist);
        message = "The Album '" + createdAlbum.title + "' was successfully created!";
      } else {
        message = "The Album '" + createdAlbum.title + "' was not created, as it already exists in this Artist.";
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
