import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AlbumComponent } from 'src/app/albums/album/album.component';
import { AlbumsComponent } from 'src/app/albums/albums.component';
import { selectAllArtists } from 'src/app/core/selectors/home.selectors';
import { AppState } from 'src/app/core/store/app.reducers';
import { HttpService } from 'src/app/http/http.service';
import { Album, Artist, Song } from 'src/app/shared/types.model';
import { HomeComponent } from '../../home/home.component';
import { v4 as uuid } from 'uuid';


@Component({
	selector: 'app-modify-album',
	templateUrl: './modify-album.component.html',
	styleUrls: ['./modify-album.component.scss']
})
export class ModifyAlbumComponent {
	formGroup: FormGroup;
	inputAlbum: Album | undefined;
	allArtists$: Observable<Artist[]>;
	isEditing: boolean;

	constructor(
		public dialogRef: MatDialogRef<HomeComponent | AlbumsComponent | AlbumComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { artistName: string | undefined, album: Album },
		private httpService: HttpService,
		private store: Store<AppState>
	) {
		this.isEditing = !!data;
		this.allArtists$ = this.store.pipe(select(selectAllArtists))
		//this.allArtists$ = this.httpService.getAllArtists.getValue();
		this.formGroup = new FormGroup({
			artist: new FormControl<Artist | null>(this.isEditing ? this.httpService.getArtistByName(data.artistName!) : null),
			title: new FormControl(this.isEditing ? data.album.title : null, Validators.required),
			description: new FormControl(this.isEditing ? data.album.description : null, Validators.required),
			songs: new FormArray(this.isEditing ? data.album.songs.map(song => {
				const songControl = new FormGroup({
					title: new FormControl(song.title, Validators.required),
					length: new FormControl(song.length, [Validators.pattern("^[0-5]?[0-9]:[0-5][0-9]$"), Validators.required])
				}, Validators.required);
				return songControl;
			}) : [])
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

	onSubmit() {
		const artist: Artist | null = this.formGroup.get('artist')?.value;
		const songs: Song[] = this.getSongArray.value;
		const album =
			new Album(
				this.formGroup.get('title')?.value,
				this.formGroup.get('description')?.value,
				songs,
				artist?.id,
				false
			);
		songs.map(song => {
			song.id = uuid();
			song.parentId = album.id;
		});
		if (this.isEditing) {
			album.favorite = this.data.album.favorite;
		}
		this.dialogRef.close({ artist: artist, album: album });
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	disablePreviousStep() {
		return this.getSongArray.controls.some(control => control.invalid);
	}

	get getSongArray() {
		return (((<FormArray>this.formGroup.get('songs'))));
	}


}
