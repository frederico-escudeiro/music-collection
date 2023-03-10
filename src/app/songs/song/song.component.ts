import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/http/http.service';
import { GlobalConstants } from 'src/shared/global.constants';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
  songTitle = "";
  albumTitle = ""
  song: any;
  favorite: boolean = false;

  constructor(private route: ActivatedRoute, private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.songTitle = this.route.snapshot.params[GlobalConstants.SONG_TITLE_STRING];
    this.albumTitle = this.route.snapshot.params[GlobalConstants.ALBUM_TITLE_STRING];
    this.song = this.httpService.getSongByTitle(this.songTitle);
    this.favorite = this.router.url.includes("/" + GlobalConstants.FAVORITE_STRING, 0);

  }

  onToggleFavorite() {
    this.favorite = !this.favorite;
    this.router.navigateByUrl('/'+GlobalConstants.MY_ALBUMS_STRING+'/'
      + this.route.snapshot.paramMap.get(GlobalConstants.ALBUM_TITLE_STRING)
      + '/'
      + this.route.snapshot.paramMap.get(GlobalConstants.SONG_TITLE_STRING)
      + (this.favorite ? '/' + GlobalConstants.FAVORITE_STRING : '')
    );
    this.httpService.postSongDataWithFavorite(
      this.songTitle,
      this.song.albumTitle,
      this.song.artistName,
      this.favorite
    )
  }
}
