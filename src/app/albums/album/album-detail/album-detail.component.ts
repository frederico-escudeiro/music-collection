import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http/http.service';
import { GlobalConstants } from 'src/app/shared/global-constants.enum';
import { EditAlbumComponent } from '../edit-album/edit-album.component';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent {

  @Input() album: any;

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar,private httpService: HttpService, private router: Router) {

  }

  onEditAlbum() {
    const dialogRef = this.dialog.open(EditAlbumComponent, { data: this.album, disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      let message = "";
      if (result !== undefined) {
        this.httpService.updateWithEditedAlbum(this.album, result.album, result.artist);
        message = "Album '" + result.album.title + "'  was successfully edited! :)";
        this.router.navigate([
          '/' + GlobalConstants.MY_ALBUMS_STRING +
          '/' + result.album.title +
          (result.album.favorite ? '/' + GlobalConstants.FAVORITE_STRING : '')
        ]);
      } else {
        message = "Album '" + result.album.title + "' was not edited. :(";
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
