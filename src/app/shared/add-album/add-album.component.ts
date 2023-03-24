import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlbumsComponent } from 'src/app/albums/albums.component';
import { Album, Artist, Song } from 'src/app/shared/types.model';
import { HomeComponent } from '../../home/home.component';


@Component({
	selector: 'app-add-album',
	templateUrl: './add-album.component.html',
	styleUrls: ['./add-album.component.scss']
})
export class AddAlbumComponent {
	formGroup: FormGroup;

	constructor(public dialogRef: MatDialogRef<HomeComponent | AlbumsComponent>, @Inject(MAT_DIALOG_DATA) public data: Artist[]) {
		this.formGroup = new FormGroup({
			artist: new FormControl<Artist|null>(null),
			title: new FormControl(null, Validators.required),
			description: new FormControl(null, Validators.required),
			songs: new FormArray([])
		});
	}

	onAddSongControl() {
		const songControl = new FormGroup({
			title: new FormControl(null, Validators.required),
			length: new FormControl(null, [Validators.pattern("^[0-5]?[0-9]:[0-5][0-9]$"), Validators.required])
		}, Validators.required);

		this.getSongArray.push(songControl);
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
		const artist:Artist = this.formGroup.get('artist')?.value;
		this.dialogRef.close({artist:artist, album: album});
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	get getSongArray() {
		return (((<FormArray>this.formGroup.get('songs'))));
	}


}
