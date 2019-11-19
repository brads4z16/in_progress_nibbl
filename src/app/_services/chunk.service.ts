import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../_configs/main_config';
import { Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChunkService {

  constructor(
    private http: HttpClient,
    private config: Config
  ) { }

  private uri = this.config.uri;

  private posts: any;
  private postObserver = new Subject<any>();

  public subscribeToPosts(): Observable<any> {
    return this.postObserver.asObservable();
  }

  public sendPosts(posts: any) {
    this.postObserver.next(posts);
  }

  public getPosts() {
    return this.posts;
  }

  public loadChunk(chunkid: String): Promise<any> {
    return new Promise((res, rej) => {
      this.http.get(`${this.uri}/view/chunk/${chunkid}`).subscribe(
        data => {
          res(data);
        },
        error => {
          console.log(error);
          rej(error);
        }
      )
    });
  }

  public loadPosts(postids: Array<any>): Promise<any> {
    return new Promise((res, rej) => {
      let promiseArr = [] 
      postids.forEach((post) => {
        promiseArr.push(this.loadOnePost(post));
      });
      Promise.all(promiseArr)
      .then((data) => {
        this.posts = data;
        this.sendPosts(data);
        res(data);
      })
      .catch((error) => {
        rej(error);
      })
    })
  }

  public loadOnePost(postid: any): Promise<any> {
    return new Promise((res, rej) => {
      this.http.get(`${this.uri}/view/post/${postid}`).subscribe(
        data => {
          res(data);
        },
        error => {
          rej(error);
        }
      )
    })
  } 

  public createPost(postData: any): Promise<any> {
    return new Promise((res, rej) => {
      this.http.post(`${this.uri}/create/post`, postData).subscribe(
        data => {
          this.posts.push(data);
          this.sendPosts(this.posts);
          res(data);
        },
        error => {
          console.log(error);
          rej(error);
        }
      )
    })
  }

  public createChunk(chunkData: any): Promise<any> {
    return new Promise((res, rej) => {
      this.http.post(`${this.uri}/create/chunk`, chunkData).subscribe(
        data => {
          res(data);
        },
        error => {
          console.log(error);
          rej(error);
        }
      )
    });
  }

  public searchChunks(query: String): Promise<any> {
    return new Promise((res, rej) => {
      this.http.get(`${this.uri}/search/${query}`).subscribe(
        data => {
          res(data);
        },
        error => {
          rej(error);
        }
      )
    })
  }

}
