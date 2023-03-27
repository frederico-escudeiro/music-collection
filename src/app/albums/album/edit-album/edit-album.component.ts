import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/app/http/http.service';
import { Album, Artist } from 'src/app/shared/types.model';
import { SongComponent } from '../song/song.component';

@Component({
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.scss']
})
export class EditAlbumComponent {

  formGroup: FormGroup;
  allArtists: Artist[];
  albumToEdit: Album;

  constructor(
    private httpService: HttpService,
    public dialogRef: MatDialogRef<SongComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.albumToEdit = data.album;
    this.allArtists = this.httpService.getArtistsData();
    let initArtistValue = this.httpService.getArtistByName(data.artistName);
    //this.selectedArtist = this.httpService.getArtistByName(data.artistName);
    this.formGroup = new FormGroup({
      title: new FormControl(this.albumToEdit.title, Validators.required),
      description: new FormControl(this.albumToEdit.description, Validators.required),
      artist: new FormControl(initArtistValue, Validators.required)
    })
  }

  onEditAlbum() {
    let artistEdited:Artist | null = this.formGroup.get('artist')?.value;
    let albumTitleEdited = this.formGroup.get('title')?.value;
    let albumDescriptionEdited = this.formGroup.get('description')?.value;
    let albumEdited: Album | null = new Album( albumTitleEdited, albumDescriptionEdited, this.albumToEdit.songs ); //Cria album sem pensar nas songs.
    this.dialogRef.close(
      {
        artist: artistEdited,
        album: albumEdited
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
