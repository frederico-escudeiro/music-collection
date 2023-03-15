import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/http/http.service';
import { Album, Artist, Song } from 'src/shared/types.model';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})
export class AddAlbumComponent implements OnInit {
  album!: Album;
  newAlbumForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<HomeComponent>, @Inject(MAT_DIALOG_DATA) public artist: Artist) { }

  ngOnInit(): void {
    this.newAlbumForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'songs': new FormArray([])
    })
  }

  onCreateAlbum():Album {
    return this.album = new Album(this.newAlbumForm.get('title')?.value, this.newAlbumForm.get('description')?.value, []);
  } 

  onNoClick(): void {
    this.dialogRef.close();
  }
}
