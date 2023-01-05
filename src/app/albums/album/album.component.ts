import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { OnInit } from '@angular/core';
import { JsonService } from 'src/app/json.service';
import { Router } from '@angular/router';
import { Album, Song, SongFavorite } from 'src/helper_classes/album';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit{
  
  albumTitle:string = "";
  album:any;
  favorite:boolean = false; 
  constructor(private route:ActivatedRoute, private router: Router, private jsonService:JsonService){}

  ngOnInit(): void {
    this.albumTitle = this.route.snapshot.params['albumTitle'];
    this.album = this.jsonService.getAlbumByTitle(this.albumTitle);
    this.favorite = this.router.url.includes("/favorite",0);
    console.log('favorite:' + this.favorite);
  }

  onLoadSongByTitle(song:SongFavorite){
    this.router.navigate(['/myalbums/' + this.albumTitle + '/' + song.title + (song.favorite ? '/favorite' : '')]);
  }

  onToggleFavorite(){
    this.favorite = !this.favorite;
      this.router.navigateByUrl('/myalbums/' 
        + this.route.snapshot.paramMap.get('albumTitle')
        + (this.favorite? '/favorite' : '')
      );
      this.jsonService.updateAlbumDataWithFavorite(
        this.albumTitle,
        this.album.artistName,
        this.favorite
      )
    }

}
