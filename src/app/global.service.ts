import { Injectable } from '@angular/core';
export interface info {
  Username:string;
  Email:string;
  Password:string;
  Name:string;
  task:any;
}
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }
  Info:any =[];
  userind: any = [];
  ab: string = 'jaaay';
  temp: any = [];
  usertask: any = null;
  adm: string = '';
  track:any = 0;
  getinfo() {
    return this.Info;
  }
  In :info[];
}
