import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/http/http.service';
import { Album, Artist, Song } from 'src/shared/types.model';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})
export class AddAlbumComponent implements OnInit {
  @Input('artist') artist!: Artist;
  album!: Album;
  @Output('closeModal') close;
  newAlbumForm!: FormGroup;

  constructor(private httpService: HttpService) {
    this.close = new EventEmitter<void>();
  }

  ngOnInit(): void {
    this.newAlbumForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'songs': new FormArray([])
    })
  }

  onAddSong(){
    const songControl = new FormControl(null);
    (<FormArray>this.newAlbumForm.get("songs")).push(songControl)
  }


  onCreateAlbum() {
    this.album = new Album(
      this.newAlbumForm.get("title")?.value,
      this.newAlbumForm.get("description")?.value,
      []);
    this.httpService.postNewAlbumData(this.album, this.artist)
    this.onCloseModal();
  }


  onCloseModal() {
    this.close.emit()
    //close the modal window
  }
}
