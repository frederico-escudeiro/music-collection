import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(public dialog: MatDialog, private httpService: HttpService) {
    this.artists = this.httpService.getArtistsData();
  }

  openDialog(artist: Artist): void {
    const dialogRef = this.dialog.open(AddAlbumComponent, {data: artist});

    dialogRef.afterClosed().subscribe(result => {
      this.createdAlbum = result;
      if(this.createdAlbum !== undefined){
        this.httpService.postNewAlbumData(this.createdAlbum, artist);
      }
    });

  }



}
