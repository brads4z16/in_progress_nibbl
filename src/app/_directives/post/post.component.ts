import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommentsDialog } from '../../dialogs/comments/comments.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  liked = false;

  @Input() Post: any;

  ngOnInit() {
    let currentuser = JSON.parse(localStorage.getItem('currentUser'));
    this.liked = true;
  }

  public openComments() {
    const dialogRef = this.dialog.open(CommentsDialog, {
      data: {
        title: this.Post.title,
        content: this.Post.content,
        autoFocus: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
  
    })
  }

}
