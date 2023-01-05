import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SongFavorite } from 'src/helper_classes/album';
import { JsonService } from '../json.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent {

  constructor(private jsonService: JsonService, private router: Router) { }

  songs = this.jsonService.getSongData();

  onLoadSongByTitle(songTitle: string) {
    for (let song of this.songs) {
      if (songTitle === song.song.title) {
        this.router.navigate(['/myalbums/' + song.albumTitle + '/' + song.song.title  + (song.song.favorite ? '/favorite' : '')]);
      }
    }
  }
}
