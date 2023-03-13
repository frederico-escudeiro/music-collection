import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/shared/global-constants.enum';
import { HttpService } from '../http/http.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent {

  constructor(private httpService: HttpService, private router: Router) { }

  songs = this.httpService.getSongData();

  onLoadSongByTitle(songTitle: string) {
    for (let song of this.songs) {
      if (songTitle === song.song.title) {
        this.router.navigate(['/' + GlobalConstants.MY_ALBUMS_STRING + '/' + song.albumTitle + '/' + song.song.title + (song.song.favorite ? '/' + GlobalConstants.FAVORITE_STRING : '')]);
      }
    }
  }
}
