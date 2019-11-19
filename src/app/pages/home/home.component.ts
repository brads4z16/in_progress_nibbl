import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommentsDialog } from '../../dialogs/comments/comments.component';
import { ChunkService } from '../../_services/chunk.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private chunkService: ChunkService,
    private snackbar: MatSnackBar
  ) { }

  loadingPage = true;
  pageTitle = "Trending"
  chunkid: String;
  chunkInfo: any;
  posts: any;

  postSubscription$: Subscription;

  noPostsPost = {
    title: "Nothing to nibbl on here yet :(",
    body: "Post something from the pencil icon above!!", 
    chunk_id: -1
  }

  ngOnInit() {
    this.setSubscriptions();

    let currentuser = JSON.parse(localStorage.getItem('currentUser'));

    this.chunkService.loadChunk(this.chunkid)
    .then((chunkData) => {
      this.chunkInfo = chunkData;
      this.chunkService.loadPosts(this.chunkInfo.posts)
      .then((postData) => {
        
        this.posts = postData;
        this.loadingPage = false;
      })
      .catch((e) => {
        
      })
    })
    .catch((e) => {
      this.snackbar.open('Error loading chunks, please refresh', null, {
        panelClass: 'error-snackbar'
      });
    })
  }

  public openComments() {
    const dialogRef = this.dialog.open(CommentsDialog, {
      data: {
        title: 'Test',
        content: 'This is an example post'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  public setSubscriptions() {
    let urlSubscription$ = this.route.params.subscribe(params => {
      this.chunkid = params.chunkid;
    });

    this.postSubscription$ = this.chunkService.subscribeToPosts().subscribe(
      data => {
        this.posts = data;
      }
    )
  }

}
