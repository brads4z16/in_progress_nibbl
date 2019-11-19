import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CommentsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  comment = "";

  commentForm = this.fb.group({
    comment: ['', Validators.required]
  });

  ngOnInit() {
  }

  submitComment() {
    console.log(this.commentForm.controls.comment.value);
  }

}
