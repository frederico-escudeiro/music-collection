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
  createdAlbum!: Album;

  constructor(public dialog: MatDialog, private httpService: HttpService, private snackBar: MatSnackBar) {
    this.artists = this.httpService.getArtistsData();
  }

  openDialog(artist: Artist): void {
    const dialogRef = this.dialog.open(AddAlbumComponent, { data: artist });

    dialogRef.afterClosed().subscribe(result => {
      this.createdAlbum = result;
      let message = "";
      if (this.createdAlbum !== undefined && !this.httpService.existsDuplicateAlbum(this.createdAlbum.title)) {
        this.httpService.postNewAlbumData(this.createdAlbum, artist);
        message = "The Album '" + this.createdAlbum.title + "' was successfully created!";
      } else {
        message = "The Album '" + this.createdAlbum.title + "' was not created, as it already exists in this Artist."
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
