import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/shared/global-constants.enum';
import { Album } from 'src/app/shared/types.model';
import { HttpService } from '../http/http.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent {
  constructor(private httpService: HttpService, private router: Router) { }

  artistAlbums = this.httpService.getAlbumsData()

  onLoadAlbumByTitle(album: Album) {
    this.router.navigate(['/' + GlobalConstants.MY_ALBUMS_STRING + '/' + album.title + (album.favorite ? '/' + GlobalConstants.FAVORITE_STRING : '')]);
  }
}
