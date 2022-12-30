import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsonService } from 'src/app/json.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit{
  songTitle="";
  song:any;
  favorite:boolean = false;
  constructor(private route:ActivatedRoute, private jsonService:JsonService){}

  ngOnInit(){
    this.songTitle = this.route.snapshot.params['songTitle'];
    this.song = this.jsonService.getSongByTitle(this.songTitle);
  }

  onToggleFavorite(){
    this.favorite = !this.favorite;

  }
}
