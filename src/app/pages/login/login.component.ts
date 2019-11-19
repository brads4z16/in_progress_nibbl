import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private userService: UserService
  ) { }

  signInForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  createUserForm = this.fb.group({
    name: ['', Validators.required],
    dob: ['', Validators.required],
    email: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirmpassword: ['', Validators.required]
  });

  ngOnInit() {
    let currentuser = JSON.parse(localStorage.getItem('currentUser'));
    
    if(currentuser) {
      if(new Date(currentuser.expires) > new Date()) {
        this.router.navigate(['chunk/1']);
      }
    }
  }

  public signIn() {
    this.userService.login(this.signInForm.controls)
    .then((data) => {

    })
    .catch((e) => {
      this.snackbar.open("Invalid Credentials", 'Dismiss', {
        panelClass: "error-snackbar"
      });
    })
  }

  public createUser() {
    this.userService.createUser(this.createUserForm.controls)
    .then((data) => {

    })
    .catch((e) => {
      console.log(e);
      this.snackbar.open(e.error, "Dismiss", {
        panelClass: "error-snackbar"
      });
    });
  }
}
