import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { Router } from '@angular/router'; // CLI imports router
import { GlobalService } from 'src/app/global.service';
import { AuthService } from 'src/app/auth/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument }  from '@angular/fire/firestore';
@Component({
    templateUrl: 'login.component.html',

})
export class LogComponent {
    constructor(private db: AngularFirestore,private router: Router, private _global: GlobalService, public authService: AuthService) {
        console.log('log loaded');
     }
    public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
    public Userinfo: any = [];

    check: boolean = false;
    show: boolean = false;

    ngOnInit() {

        //this.Userinfo = JSON.parse(localStorage.getItem("infos")) || [];
        // this.db.list('users')
        // .valueChanges()
        // .subscribe(res => {
        //     //console.log(res)//should give you the array of percentage. 
        //     this.Userinfo = res || [];
    
        // });

        this.db.collection('users').valueChanges().subscribe(
            res => {
              this.Userinfo = res || [];
              
              console.log(this.Userinfo);
            }
          );

    }
    
    checkuser(username, pass) {
        this._global.adm = username;
        console.log(this.Userinfo.length)
        //localStorage.setItem("user", JSON.stringify(username));
        //firebase.database().ref('user').set(username);
        // if (username == '')
        //     alert('must fill username');
        // if (pass == '')
        //     alert('must fill password');
        if (username == 'admin' || username =='manage') {
            this.router.navigate(['admin']);
            this.check = true;
        }
        else {
            for (let i = 0; i <this.Userinfo.length; i++) {
                if (username == this.Userinfo[i].Username && pass == this.Userinfo[i].Password) {

                   console.log(username);
                    this.check = true;
                    this._global.userind[0] = i;
                    firebase.firestore().collection('user').doc('current').set({...this._global.userind });
                    this._global.ab = this.Userinfo[i].Name;
                    this._global.temp = this.Userinfo[i].task;
                    // localStorage.setItem("id", JSON.stringify(i));
                    // firebase.database().ref('id').set(i);
                    this.router.navigate(['home']);
                }
            }
          
        }
        if (this.check == false) {
            // if(username == 'admin' && pass == '3006')
            // {this._global.temp = this.Userinfo[0].task;}
            // else{

            alert('username or password not match or \n register as new user! ');
        }
    };
    abc: string = this._global.adm;
    user: any = this._global.temp;

    // if(username == 'admin' && pass == '123456')
    // {
    //  this.router.navigate(['home']) ;  
    // }
    // else
    // {
    //     alert('username and password does not match');
    // }




}