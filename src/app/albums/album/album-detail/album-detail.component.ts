import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http/http.service';
import { ModifyAlbumComponent } from 'src/app/shared/modify-album/modify-album.component';
import { GlobalConstants } from 'src/app/shared/global-constants.enum';
import { Album } from 'src/app/shared/types.model';
import { AppState } from 'src/app/core/store/app.reducers';
import { Store } from '@ngrx/store';
import { AlbumsActions } from 'src/app/core/store/action-types';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit{

  @Input() album!: Album;
  albumDuration!: string;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private httpService: HttpService,
    private router: Router,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.albumDuration = this.httpService.getAlbumDuration(this.album.songs);
  }

  onEditAlbum() {
    const dialogRef = this.dialog.open(ModifyAlbumComponent, { data: this.album, disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      let message = "";
      if (result === undefined) {
        message = "Album '" + this.album.title + "' was not edited. :(";
      } else {
        this.store.dispatch(AlbumsActions.editAlbum(result.album))
        //this.httpService.updateWithEditedAlbum(this.album, result.album, result.artist);
        message = "Album '" + result.album.title + "'  was successfully edited! :)";
        this.router.navigate([
          '/' + GlobalConstants.MY_ALBUMS_STRING +
          '/' + result.album.title +
          (result.album.favorite ? '/' + GlobalConstants.FAVORITE_STRING : '')
        ]);
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
