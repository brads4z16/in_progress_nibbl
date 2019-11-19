import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../_configs/main_config';
import { Observable, Observer } from 'rxjs';
import { AuthProvider } from '../_providers/auth-provider';
import { ChunkService } from './chunk.service';

@Injectable()

export class UserService {

  constructor(
    private http: HttpClient,
    private config: Config,
    private auth: AuthProvider,
    private chunkService: ChunkService
  ) { }

  private uri = this.config.uri;

  public createUser(userData: any): Promise<any> {
    return new Promise((res, rej) => {
      if(userData.password.value !== userData.confirmpassword.value) {
        rej({error: 'Passwords do not match'});
      }

      let data = {
        username: userData.username.value,
        password: userData.password.value,
        age: this.auth.caculateAge(userData.dob.value),
        email: userData.email.value
      };

      this.auth.verifyUser(data)
      .then((data) => {
        this.http.post(`${this.uri}/create/user`, data).subscribe(
          data => {
            this.auth.storeUser(data);
            res();
          },
          error => {
            console.log(error);
            rej({error: error.error.error});
          }
        );
      })
      .catch((e) => {
        rej({error: e[0]}); 
      })
    })
  }

  public login(userData: any): Promise<any> {
    return new Promise((res, rej) => {
      let data = {
        username: userData.username.value,
        password: userData.password.value,
      }
      this.http.post(`${this.uri}/login`, data).subscribe(
        data => {
          this.setSavedChunks(data)
          .then((data) => {
            this.auth.storeUser(data);
            res();
          })
          .catch((e) => {

          })
        },
        error => {
          rej({error: error.error.error});
        }
      )
    })
  }

  public saveChunk(userid: any, chunkid: any): Promise<any> {
    return new Promise((res, rej) => {
      let data = {
        userid: userid,
        chunkid: chunkid
      }
      this.http.post(`${this.uri}/savechunk`, data).subscribe(
        data => {
          this.setSavedChunks(data)
          .then((data) => {
            this.auth.storeUser(data);
            res()
          })
          .catch((e) => {
            rej(e)
          })

        },
        error => {
          console.log(error);
          rej(error);
        }
      )
    })
  }

  public setSavedChunks(savedChunks: any): Promise<any> {
    return new Promise((res, rej) => {
      let promiseArr = [];
      savedChunks.savedchunks.forEach((chunkid) => {
        promiseArr.push(this.chunkService.loadChunk(chunkid))
      });

      Promise.all(promiseArr)
      .then((data) => {
        savedChunks.savedchunks = data;
        res(savedChunks);
      })
      .catch((e) => {
        console.log(e);
      })
    })
  }

}
