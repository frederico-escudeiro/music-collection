import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { HttpService } from 'src/app/http/http.service';
import { Router } from '@angular/router';
import { Song } from 'src/shared/types.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalConstants } from 'src/shared/global-constants.enum';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  albumTitle: string = "";
  album: any;
  isFavorite: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private httpService: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.albumTitle = this.route.snapshot.params[GlobalConstants.ALBUM_TITLE_STRING];
    this.album = this.httpService.getAlbumByTitle(this.albumTitle);
    this.isFavorite = this.router.url.includes('/' + GlobalConstants.FAVORITE_STRING, 0);
  }

  onLoadSongByTitle(song: Song) {
    this.router.navigate(['/' + GlobalConstants.MY_ALBUMS_STRING + '/' + this.albumTitle + '/' + song.title + (song.favorite ? '/' + GlobalConstants.FAVORITE_STRING : '')]);
  }

  onToggleFavorite() {
    this.isFavorite = !this.isFavorite;
    this.router.navigateByUrl('/' + GlobalConstants.MY_ALBUMS_STRING + '/'
      + this.route.snapshot.paramMap.get(GlobalConstants.ALBUM_TITLE_STRING)
      + (this.isFavorite ? '/' + GlobalConstants.FAVORITE_STRING : '')
    );
    this.httpService.postAlbumDataWithFavorite(
      this.albumTitle,
      this.album.artistName,
      this.isFavorite
    )
    this.handleSnackBar();
  }

  handleSnackBar() {
    let message = "The album '" + this.albumTitle + "' was " + (this.isFavorite ? 'added to' : 'removed from') + " favorites!"
    let snackBarRef = this.snackBar.open(message);
    setTimeout(() => {
      snackBarRef.dismiss()
    },
      3000
    )
  }



}
