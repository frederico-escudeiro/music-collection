import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/shared/global-constants.enum';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  isTooltipEnabled: boolean = false;


  constructor(private router: Router, private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([
      "(max-width: 700px)"
    ]).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.isTooltipEnabled = false;
      } else {
        this.isTooltipEnabled = true;
      }
    })
  }

  onLoadArtists(){
    this.router.navigate(['/']);
  }

  onLoadAlbums() {
    this.router.navigate(['/' + GlobalConstants.MY_ALBUMS_STRING]);
  }

  onLoadSongs() {
    this.router.navigate(['/' + GlobalConstants.MY_SONGS_STRING]);
  }

  onLoadFavorites() {
    this.router.navigate(['/' + GlobalConstants.MY_FAVORITES_STRING]);
  }

  

}
