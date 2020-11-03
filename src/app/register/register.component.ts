import { Component, OnInit } from '@angular/core';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { GlobalService } from 'src/app/global.service';
import { AuthService } from 'src/app/auth/auth.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router'; // CLI imports router
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument }  from '@angular/fire/firestore';
import { AngularFireDatabase, } from '@angular/fire/database';
import { Observable } from 'rxjs';
export interface info {
  Username:string;
  Email:string;
  Password:string;
  Name:string;
}
@Component({
  templateUrl: 'register.component.html',
  styleUrls: ['styl.css']
})
export class RegisterComponent {

  constructor(private db1: AngularFireDatabase,private router: Router, private _global: GlobalService, public authService: AuthService, private db: AngularFirestore) { console.log('regi loaded'); }
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  invoiceCol: AngularFirestoreDocument<info[]>;
  i1:AngularFirestoreDocument <info>;
  a : Observable<info[]>;
  b: info[];
  todo:any =[];
  no:number= 0;
  
  ngOnInit() {

    this.db.collection('users').doc('0').valueChanges().subscribe(
      res => {
        this._global.Info = res || [];
        
        console.log(this._global.Info);
      }
    );
    this.db.collection('index').doc('0').valueChanges().subscribe(
      res => {
        this._global.track = res || 0;
         this.no = this._global.track[0];
        console.log(this._global.track);
      }
    );

    // this.invoiceCol = this.db.collection("users").doc('1');
  
    // this.invoiceCol.valueChanges();
    // this.a =  this.invoiceCol.valueChanges();
    // this.a.subscribe(invoice=> { //converting oberv in array
    //   this.b= invoice;
    //   console.log(this.b);
    // });
   

  }

  


  getdata() {
    return firebase.database().ref('users').on("value", function (snapshot) { });
  }
  phone(number) {
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = number.toString();
    console.log(phoneNumberString);
    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then((confirmationResult) => {

        const verification = prompt('Enter verification code');
        if (verification != null) {
          console.log(verification);
          confirmationResult.confirm(verification)
            .then((good) => {
              console.log('check in');
            })
            .catch((bad) => {
              console.log('check out');
            });
        } else {
          console.log('No verification code entered');
        }
      })
      .catch((err) => {
        console.log('sms not sent', err);
      });

  }
  add(name, email, user, pass) {
    var addnewuser = {
      Name: name,
      Email: email,
      Username: user,
      Password: pass,
      task: [],
    }
    //  this.no=this._global.Info.length;
    //  this._global.Info.push(addnewuser);
   
    
    
    localStorage.setItem("infos", JSON.stringify(this._global.Info));
    //firebase.database().ref('users').set(this._global.Info);
    firebase.firestore().collection('users').doc(this._global.track[0]).set(addnewuser);
    this.no++;
    console.log(this.no);
    this._global.track[0] = this.no.toString();
    console.log(this._global.track[0]);
    
    firebase.firestore().collection('index').doc('0').set({... this._global.track});
    console.log(this._global.Info);
  };
}
