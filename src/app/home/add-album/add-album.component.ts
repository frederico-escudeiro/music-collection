import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Album, Artist, Song } from 'src/app/shared/types.model';
import { HomeComponent } from '../home.component';


@Component({
	selector: 'app-add-album',
	templateUrl: './add-album.component.html',
	styleUrls: ['./add-album.component.scss']
})
export class AddAlbumComponent {
	formGroup: FormGroup;

	constructor(public dialogRef: MatDialogRef<HomeComponent>, @Inject(MAT_DIALOG_DATA) public artist: Artist) {
		this.formGroup = new FormGroup({
			title: new FormControl(null, Validators.required),
			description: new FormControl(null, Validators.required),
			songs: new FormArray([])
		});

		// this.firstFormGroup = this.fb.group({
		// 	title: [null, Validators.required],
		// 	description: [null, Validators.required],
		// 	songs: this.fb.array<Song>([])
		// });
	}

	onAddSongControl() {
		const songControl = new FormGroup({
			title: new FormControl(null, Validators.required),
			length: new FormControl(null, [Validators.pattern("^[0-5]?[0-9]:[0-5][0-9]$"), Validators.required])
		}, Validators.required);

		this.getSongArray.push(songControl);

		// const control = this.fb.group({
		// 	title: '',
		// 	length: '',
		// })

	}

	onRemoveSongControl(index: number) {
		this.getSongArray.removeAt(index);
	}

	onCreateAlbum() {
		const album =
			new Album(
				this.formGroup.get('title')?.value,
				this.formGroup.get('description')?.value,
				this.getSongArray.value);
		this.dialogRef.close(album);
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	get getSongArray() {
		return (((<FormArray>this.formGroup.get('songs'))));
	}


}
