import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/shared/global.constants';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {

  constructor(private router: Router) {
  }

  onLoadAlbums() {
    this.router.navigate(['/' + GlobalConstants.MY_ALBUMS_STRING]);
  }

  onLoadSongs() {
    this.router.navigate(['/' + GlobalConstants.MY_SONGS_STRING]);
  }

  onLoadFavorites() {
    this.router.navigate(['/' + GlobalConstants.MY_FAVORITES_STRING]);
  }
}
