import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  
  constructor(private router: Router){
  }

  onLoadAlbums(){
      this.router.navigate(['/myalbums']);
  }

  onLoadSongs(){
    this.router.navigate(['/mysongs']);
}
}
