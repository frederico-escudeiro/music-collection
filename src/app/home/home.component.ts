import { Component } from '@angular/core';
import { Artist } from 'src/shared/types.interface';
import { HttpService } from '../http/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  artists: Artist[];

  constructor(private httpService: HttpService) { 
    this.artists = this.httpService.getArtistsData();
  }

}
