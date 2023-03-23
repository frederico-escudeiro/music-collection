import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeComponent } from 'src/app/home/home.component';
import { Album, Artist } from 'src/app/shared/types.model';
import { SongComponent } from '../song.component';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.scss']
})
export class EditSongComponent {
  formGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<SongComponent>, @Inject(MAT_DIALOG_DATA) public data: Artist[]) {
    this.formGroup = new FormGroup({
      artist: new FormControl<Artist | null>(null),
      album: new FormControl<Album | null >(null),
      title: new FormControl(null, Validators.required),
      length: new FormControl(null, [Validators.pattern("^[0-5]?[0-9]:[0-5][0-9]$"), Validators.required])
    }, Validators.required);
  }

  onEditSong() {
    this.dialogRef.close({ artist: this.formGroup.get('artist')?.value, album: this.formGroup.get('album') });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
