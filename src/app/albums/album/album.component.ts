import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OnInit } from '@angular/core';
import { HttpService } from 'src/app/http/http.service';
import { Router } from '@angular/router';
import { Album, Song } from 'src/app/shared/types.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalConstants } from 'src/app/shared/global-constants.enum';
import { select, Store } from '@ngrx/store';
import { selectAllAlbums } from 'src/app/core/selectors/albums.selectors';
import { AppState } from 'src/app/core/store/app.reducers';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  albumTitle: string = "";
  album!: Album;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.albumTitle = params[GlobalConstants.ALBUM_TITLE_STRING];
        this.store.pipe(select(selectAllAlbums)).subscribe(albums => {
          this.album = albums.find(album => album.title === this.albumTitle)!
        });
        this.isFavorite = !!this.album.favorite;
       // this.isFavorite = !!this.album.album.favorite;
      }
    );

    //this.isFavorite = this.router.url.includes('/' + GlobalConstants.FAVORITE_STRING, 0);
  }

  onLoadSongByTitle(song: Song) {
    this.router.navigate(['/' + GlobalConstants.MY_ALBUMS_STRING + '/' + this.albumTitle + '/' + song.title + (song.favorite ? '/' + GlobalConstants.FAVORITE_STRING : '')]);
  }

  onToggleFavorite() {
    this.isFavorite = !this.isFavorite;
    this.album.favorite = this.isFavorite;
    //this.album.album.favorite = this.isFavorite;
    this.router.navigate(['/' + GlobalConstants.MY_ALBUMS_STRING + '/'
      + this.route.snapshot.paramMap.get(GlobalConstants.ALBUM_TITLE_STRING)
      + (this.isFavorite ? '/' + GlobalConstants.FAVORITE_STRING : '')]
    );
    // this.httpService.updateAlbumDataWithFavorite(
    //   this.albumTitle,
    //   this.album.artistName,
    //   this.isFavorite
    // )
    //put favorite album in store
    this.favoriteToggleSnackbar();
  }

  favoriteToggleSnackbar() {
    let message = "The album '" + this.albumTitle + "' was " + (this.isFavorite ? 'added to' : 'removed from') + " favorites!"
    let snackBarRef = this.snackBar.open(message);
    setTimeout(() => {
      snackBarRef.dismiss()
    },
      3000
    )
  }



}
