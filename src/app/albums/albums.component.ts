import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JsonService } from '../json.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent {
  constructor(private jsonService:JsonService, private router:Router){}

  artistAlbums = this.jsonService.getAlbumsData()

  onLoadAlbumByTitle(albumTitle:string){
    this.router.navigate(['/myalbums/' + albumTitle]);
  }
}
