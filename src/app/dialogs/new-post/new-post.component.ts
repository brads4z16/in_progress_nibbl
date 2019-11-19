import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { ChunkService } from '../../_services/chunk.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private chunkService: ChunkService,
    private snackbar: MatSnackBar
  ) {}

  newPostForm = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required]
  });

  ngOnInit() {
  }

  submitNewPost() {
    let postData = {
      title: this.newPostForm.controls.title.value,
      body: this.newPostForm.controls.content.value,
      username: this.data.username,
      chunkid: this.data.chunkid
    }
    this.chunkService.createPost(postData)
    .then((data) => {
      this.snackbar.open('Post created successfully', 'Dismiss', {
        duration: 5000,
        panelClass: 'success-snackbar'
      });
    })
    .catch((e) => {
      console.log(e);
    })
  }

}
