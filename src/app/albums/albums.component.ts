import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumFavorite } from 'src/helper_classes/album';
import { JsonService } from '../json.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent {
  constructor(private jsonService:JsonService, private router:Router){}

  artistAlbums = this.jsonService.getAlbumsData()

  onLoadAlbumByTitle(album:AlbumFavorite){
    this.router.navigate(['/myalbums/' + album.title + (album.favorite ? '/favorite' : '')]);
  }
}
