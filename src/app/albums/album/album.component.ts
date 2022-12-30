import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { OnInit } from '@angular/core';
import { JsonService } from 'src/app/json.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit{
  
  albumTitle:string = "";
  album:any;
  
  constructor(private route:ActivatedRoute, private router: Router, private jsonService:JsonService){}

  ngOnInit(): void {
    this.albumTitle = this.route.snapshot.params['albumTitle'];
    this.album = this.jsonService.getAlbumByTitle(this.albumTitle);
  }

  onLoadSongByTitle(songTitle:string){
    this.router.navigate(['/myalbums/' + this.albumTitle + '/' + songTitle]);
  }

  

}
