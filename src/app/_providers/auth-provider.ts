import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material';

@Injectable()
export class AuthProvider {

    constructor(
        private router: Router
    ){};

    public verifyUser(userData: any): Promise<any> {
        return new Promise((res, rej) => {
            let errors = [];
            // let passwordreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*`?&-=|#+;~^></\\(){}\[\]])[A-Za-z\d$@$!%*`?&-=|#+;~^&gt;&lt;/\\(){}\[\]]{8,}/;
            let passwordreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/;
            let emailreg = /^([A-Za-z0-9_\-\.+])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if(!passwordreg.test(userData.password)){
                errors.push('Password must be at least 8 characters with a number, a special character, and a capital letter');
            }
            if(!emailreg.test(userData.email)){
                errors.push('Invalid email');
            }
            if(userData.age < 13) {
               errors.push('Must be 13 years or older to join nibbl'); 
            }
            if(userData.username.length > 15 || userData.username.length < 5) {
                errors.push('Username must be between 5 and 15 characters');
            }
            if(errors.length === 0) {
                res(userData);
            } else {
                rej(errors);
            }
        });
    }

    public storeUser(data: any) {
        localStorage.clear();
        let currentUser = JSON.stringify({
            email: data.email,
            userid: data.id,
            username: data.user,
            savedchunks: data.savedchunks,
            expires: this.getTimeExpires()
        });
        localStorage.setItem('currentUser', currentUser);
        
        this.router.navigate(['chunk/1']);
    }

    public caculateAge(date) {
        const today = new Date();
        const birthDate = new Date(date);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age--;
        }
        return age;
    }

    public getTimeExpires() {
        let time = new Date();
        time.setHours(time.getHours() + 2);
        return time;
      }

}