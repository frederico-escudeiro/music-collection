import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { HttpService } from 'src/app/http/http.service';
import { Router } from '@angular/router';
import { Album, Song } from 'src/shared/types.interface';
import { GlobalConstants } from 'src/shared/global.constants';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  albumTitle: string = "";
  album: any;
  favorite: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private httpService: HttpService) { }

  ngOnInit(): void {
    this.albumTitle = this.route.snapshot.params[GlobalConstants.ALBUM_TITLE_STRING];
    this.album = this.httpService.getAlbumByTitle(this.albumTitle);
    this.favorite = this.router.url.includes('/' + GlobalConstants.FAVORITE_STRING, 0);
  }

  onLoadSongByTitle(song: Song) {
    this.router.navigate(['/' + GlobalConstants.MY_ALBUMS_STRING + '/' + this.albumTitle + '/' + song.title + (song.favorite ? '/' + GlobalConstants.FAVORITE_STRING : '')]);
  }

  onToggleFavorite() {
    this.favorite = !this.favorite;
    this.router.navigateByUrl('/' + GlobalConstants.MY_ALBUMS_STRING + '/'
      + this.route.snapshot.paramMap.get(GlobalConstants.ALBUM_TITLE_STRING)
      + (this.favorite ? '/' + GlobalConstants.FAVORITE_STRING : '')
    );
    this.httpService.postAlbumDataWithFavorite(
      this.albumTitle,
      this.album.artistName,
      this.favorite
    )
  }

}
