import {Component, OnInit} from '@angular/core';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { GlobalService } from 'src/app/global.service';
import { Router } from '@angular/router'; // CLI imports router

@Component({ templateUrl: 'admin.component.html' ,

})
export class AdminComponent {
    constructor(private router: Router,private _global: GlobalService){}
    userinfo: any = [];
    currentuser :number = null;
    checkadmin:string = null;
    ngOnInit() {

        this.userinfo = JSON.parse(localStorage.getItem("infos")) || [];
        this.checkadmin = JSON.parse(localStorage.getItem("user"));
    }
    deleteuser()
    {
        this._global.Info = this.userinfo;
        localStorage.setItem("infos", JSON.stringify(this._global.Info));

    }
    showdetails(){
        
        this._global.userind =  this.currentuser;
        if(this.checkadmin == 'manage' || this.checkadmin != 'admin' )
        {
            this.router.navigate(['home']);
            localStorage.setItem("id", JSON.stringify(this.currentuser));
        }
        else
        this.router.navigate(['user']);

    }
}
