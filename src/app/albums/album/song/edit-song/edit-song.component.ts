import { Component, ComponentFactoryResolver, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/app/http/http.service';
import { Album, Artist, Song } from 'src/app/shared/types.model';
import { SongComponent } from '../song.component';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.scss']
})
export class EditSongComponent {
  formGroup: FormGroup;
  allArtists: Artist[];
  selectedArtist: Artist | null;
  selectedAlbum?: Album | null;
  songToEdit: Song;

  constructor(public dialogRef: MatDialogRef<SongComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private httpService: HttpService) {
    this.allArtists = this.httpService.getAllArtists.getValue();
    this.selectedArtist = this.httpService.getArtistByName(data.artistName);
    this.selectedAlbum = this.selectedArtist?.albums?.find(album => album.title === data.albumTitle);
    this.songToEdit = data.song
    this.formGroup = new FormGroup({
      artist: new FormControl<Artist>(this.selectedArtist!, Validators.required),
      album: new FormControl<Album | null>(this.selectedAlbum!, Validators.required),
      title: new FormControl(this.songToEdit.title, Validators.required),
      length: new FormControl(this.songToEdit.length, [Validators.pattern("^[0-5]?[0-9]:[0-5][0-9]$"), Validators.required])
    }, Validators.required);
  }

  ngOnInit() {
    this.formGroup.get('artist')?.valueChanges.subscribe((selectedValue: Artist) => {
      this.selectedArtist = selectedValue;
      this.selectedAlbum = null;
      this.formGroup.get('album')?.setValue("");
    })

  }

  onEditSong() {
    let artist = this.formGroup.get('artist')?.value;
    let album = this.formGroup.get('album')?.value;
    let songTitle = this.formGroup.get('title')?.value;
    let songLength = this.formGroup.get('length')?.value;
    let song = new Song(songTitle, songLength, this.songToEdit.favorite);
    this.dialogRef.close(
      {
        artist: artist,
        album: album,
        song: song
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
