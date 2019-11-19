import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NewPostComponent } from '../../dialogs/new-post/new-post.component';
import { NewChunkComponent } from '../../dialogs/new-chunk/new-chunk.component';
import { ChunkService } from '../../_services/chunk.service';
import { UserService } from '../../_services/user.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private chunkService: ChunkService,
    private userService: UserService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
  ) { }

  @Input() Page: any;

  pageName: String = "Trending";
  chunkId: any;
  postSubsription$: Subscription;
  posts: any;
  placeholderVal="Search Chunks"
  userdata: any;
  searchValue = '';
  searchAutoComplete = [];
  chunkid: any;
  loadingSuggestions = false;

  searchForm = this.fb.group({
    searchVal: ['']
  });

  ngOnInit() {
    this.searchChunks();
    this.route.params.subscribe(params => {
      this.chunkid = params.chunkid;
    });
    this.userdata = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.userdata);
    this.pageName = this.Page.name;
    this.postSubsription$ = this.chunkService.subscribeToPosts().subscribe(
      data => {
        this.posts = data;
      }
    );
  }

  changeChunk(chunk: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`chunk/${chunk}`]);
    });
  }

  searchChunks() {
    this.searchForm.controls.searchVal.valueChanges.pipe(
      debounceTime(400)
    ).subscribe(
      searchVal => {
        this.searchValue = searchVal;
        if(searchVal !== ''){
          this.loadingSuggestions = true;
          this.chunkService.searchChunks(searchVal)
          .then((data) => {
            this.searchAutoComplete = Object.values(data);
            this.loadingSuggestions = false;
          })
          .catch((e) => {
            this.loadingSuggestions = false;
            this.snackbar.open('Error searching for chunks', 'Dismiss', {
              panelClass: 'error-snackbar'
            });
          })
        }
        else {
          this.searchAutoComplete = [];
        }
      }
    )
  }

  createNewPost() {
    let dialogRef = this.dialog.open(NewPostComponent, {
      data: {
        chunkid: this.chunkid,
        username: this.userdata.username
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  createNewChunk() {
    let dialogRef = this.dialog.open(NewChunkComponent, {
      data: {
        userid: this.userdata.userid,
        currentChunk: this.Page.id
      }
    });
  }

  viewProfile() {
    this.router.navigate(['profile']);
  }

  saveChunk() {
    this.userService.saveChunk(this.userdata.userid, this.Page.id)
    .then((data) => {
      this.userdata = JSON.parse(localStorage.getItem('currentUser'));
      console.log(this.userdata);
      this.snackbar.open('Saved Current Chunk', 'Dismiss', {
        duration: 5000,
        panelClass: "success-snackbar"
      });
    })
    .catch((e) => {
      this.snackbar.open('Error saving chunk', 'Dismiss', {
        panelClass: "error-snackbar"
      });
    })
  }

  filterPosts(choice: Number) {
    this.posts = this.chunkService.getPosts();

    if(choice == 1) {
      this.filterByScore();
    } else {
      this.filterByDate();
    }
  }

  filterByScore() {
    let newPosts = this.posts;
    newPosts.posts = newPosts.posts.sort((a,b) => {
      if(a.score > b.score){
        return -1;
      } else {
        return 1;
      }
    });
    this.chunkService.sendPosts(newPosts);
  }

  filterByDate() {
    let newPosts = this.posts;
    newPosts.posts = newPosts.posts.sort((a,b) => {
      if(a.timestamp > b.timestamp) {
        return -1;
      } else {
        return 1;
      }
    });
    this.chunkService.sendPosts(newPosts);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
