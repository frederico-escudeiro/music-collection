import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { GlobalConstants } from 'src/app/shared/global-constants.enum';
import { HttpService } from '../http/http.service';
import { Song } from '../shared/types.model';
import { AppState } from '../store/app.state';
import { selectAllSongs } from '../core/selectors/songs.selectors';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit{

  songs = this.httpService.getSongData();
  songs$!: Observable<Song[]>;

  constructor(private httpService: HttpService, private router: Router, private store: Store<AppState>) { }
  
  ngOnInit(): void {
    this.songs$ = this.store
      .pipe(
        select(selectAllSongs)
      )  
  }

  onLoadSongByTitle(songTitle: string) {
    for (let song of this.songs) {
      if (songTitle === song.song.title) {
        this.router.navigate(['/' + GlobalConstants.MY_ALBUMS_STRING + '/' + song.albumTitle + '/' + song.song.title + (song.song.favorite ? '/' + GlobalConstants.FAVORITE_STRING : '')]);
      }
    }
  }
}
