import { Component } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/shared/global-constants.enum';
import { Album } from '../shared/types.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  favoriteSongs: any[];
  favoriteAlbums: Album[];

  constructor(private httpService: HttpService, private router: Router) {
    this.favoriteSongs = this.httpService.getFavoriteSongs;
    this.favoriteAlbums = this.httpService.getFavoriteAlbums;
  }

  onNavigateToFavorite(item: any) {
    if (item.song !== undefined) {
      this.router.navigate([
        '/'
        + GlobalConstants.MY_ALBUMS_STRING
        + '/'
        + item.album.title
        + '/'
        + item.song.title
        + '/'
        + GlobalConstants.FAVORITE_STRING])
    } else {
      this.router.navigate([
        '/'
        + GlobalConstants.MY_ALBUMS_STRING
        + '/'
        + item.title
        + '/'
        + GlobalConstants.FAVORITE_STRING])
    }
  }
}
