import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonService } from 'src/app/json.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit{
  songTitle="";
  albumTitle=""
  song:any;
  favorite:boolean =  false;
  
  constructor(private route:ActivatedRoute, private jsonService:JsonService, private router: Router){}

  ngOnInit(){
    this.songTitle = this.route.snapshot.params['songTitle'];
    this.albumTitle = this.route.snapshot.params['albumTitle'];
    this.song = this.jsonService.getSongByTitle(this.songTitle);
    this.favorite = this.router.url.includes("/favorite",0);
    
  }

  onToggleFavorite(){
    this.favorite = !this.favorite;
      this.router.navigateByUrl('/myalbums/' 
        + this.route.snapshot.paramMap.get('albumTitle')
        + '/' 
        + this.route.snapshot.paramMap.get('songTitle')
        + (this.favorite? '/favorite' : '')
      );
      this.jsonService.updateSongDataWithFavorite(
        this.songTitle,
        this.song.albumTitle,
        this.song.artistName,
        this.favorite
      )
    }
  }
