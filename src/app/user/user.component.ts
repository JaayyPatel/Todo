import {Component, OnInit} from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { Router } from '@angular/router'; // CLI imports router


@Component({ templateUrl: 'user.component.html' ,

})
export class UserComponent {
  constructor(private router: Router,private _global: GlobalService){
    console.log('user loaded');
  }
  userinfo: any = [];
  usertask:any =[];
  mainuse:string = JSON.parse(localStorage.getItem("user"));
  i = JSON.parse(localStorage.getItem("id"));
  // currentuser :number = null;
  ngOnInit() {

      this.userinfo = JSON.parse(localStorage.getItem("infos")) || [];
      this.usertask = this.userinfo[this.i].task;
  }
  back()
  {
    this.router.navigate(['admin']);
  }
}
