import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/app/http/http.service';
import { EditAlbumComponent } from '../edit-album/edit-album.component';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent {

  @Input() album: any;

  constructor(public dialog: MatDialog, private httpService: HttpService) {

  }

  onEditAlbum() {
    const dialogRef = this.dialog.open(EditAlbumComponent, { data: this.album });

    dialogRef.afterClosed().subscribe(result => {
      this.httpService.updateWithEditedAlbum(this.album, result.album, result.artist);
      let message = "";

    });
  }

}
