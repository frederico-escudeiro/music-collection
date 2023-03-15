import { Component, ElementRef, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/shared/global-constants.enum';
import { Artist } from 'src/shared/types.model';
import { HttpService } from '../http/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  artists: Artist[];
  isAddingAlbum: boolean;
  selectedArtist!: Artist;

  constructor(private httpService: HttpService) {
    this.artists = this.httpService.getArtistsData();
    this.isAddingAlbum = false;
  }

  onAddNewAlbum(artist:Artist) {
    this.selectedArtist = artist;
    this.isAddingAlbum = true;
  }

  onStopAdding(){
    this.isAddingAlbum = false;
  }
 
}
