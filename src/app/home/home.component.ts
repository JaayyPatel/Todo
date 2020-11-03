import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GlobalService } from 'src/app/global.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';
export interface State {
  St: string;

}
export interface Label {
  label: string;
}



@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['styl.css'],
})
export class HomeComponent implements OnInit {
  constructor(private db: AngularFirestore, private _global: GlobalService, private dialogService: NbDialogService, private router: Router) {
    this.minDate = new Date();
    console.log('home loaded');

  }
  todo: any = [];
  usern: any = [];
  newtodo: any[] = [];
  public a: any = [];
  i = null;
  b = [];
  mainuse: string = JSON.parse(localStorage.getItem("user"));

  btt: boolean;
  currentEdit: number = null;
  utcdate: string = null;
  nome: string = '';
  minDate: Date;
  current: State[] = [];
  pageslice: any = [];
  user: string = null;
  click: number = 0;
  itemsprpage = 5;
  li = 0;
  items: any[] = [];
  public firstInResponse: any = [];
  public lastInResponse: any = [];


  ngOnInit() {
    //this.todo = JSON.parse(localStorage.getItem("todos")) || [];
    this.current = JSON.parse(localStorage.getItem("states")) || [];
    // this.items = this.db.list('users').valueChanges();
    // console.log(this.items);
    //this.alltodo =  JSON.parse(localStorage.getItem("current")) || [];
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

   
    this.db.collection('user').doc('current').valueChanges().subscribe(
      res => {
        this._global.userind = res;

        this.db.collection('utask' + this._global.userind[0].toString(), ref => ref
          .orderBy("date")
          .limit(3)


        )
          .snapshotChanges()
          .subscribe((response) => {

          // this.todo = 
         
        
          this.pageslice = [];
          if (response.length==0) {
            this.todo = [];
           
          }
          else
          {
            this.firstInResponse = response[0].payload.doc;
            this.lastInResponse = response[response.length - 1].payload.doc;
          this.pageslice = response.map(item => {
            return {
              
              id: item.payload.doc.data()
            }
          })
         for(let i=0;i<this.pageslice.length;i++)
         {
           this.todo[i] = this.pageslice[i];
         }
        }
        console.log(this.todo);

          });
      }
    );








  }
  temp = [];
  
  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
    // .onClose.subscribe(name => name && this.names.push(name));
  }
  open1(dialog1: TemplateRef<any>) {
    this.dialogService.open(dialog1);
    // .onClose.subscribe(name => name && this.names.push(name));
  }

  drop(event: CdkDragDrop<Label[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }



  addOrEditTask(newtaskLabel, state, daate) {//console.log(this.utcdate);
    if (newtaskLabel == "") {
      alert('must add task');
    }
    if (state == "") {
      alert('must add state');
    }
    if (daate == "") {
      alert('must add date');
    }
    var newtask = {
      label: newtaskLabel,
      St: state,
      date: new Date(daate).toISOString(),
      assign: 'self',
    };
    if (this.currentEdit != null) {
      this.todo.splice(this.currentEdit, 1, newtask);
      this.currentEdit = null;
    } else {
      this.todo.push({newtask});
      


      
      firebase.firestore().collection('utask' + this._global.userind[0].toString()).doc().set(newtask);

    }

  };

  storedata() {
    this.a.push(this.todo);
    //this._global.Info = this.a;
    //localStorage.setItem("todos", JSON.stringify(this.todo));
    //localStorage.setItem("infos", JSON.stringify(this._global.Info));


  };

  deletestoredata() {
    //localStorage.setItem("todos", JSON.stringify(this.todo));
    this._global.Info[this.i].task = this.todo;
    //localStorage.setItem("infos", JSON.stringify(this._global.Info));
    firebase.database().ref('users').set(this._global.Info);

  };
  // onpagechange(event:PageEvent){
  //   const startindex = event.pageIndex * event.pageSize;
  //   let endindex = startindex + event.pageSize;
  //   if(endindex > this.todo.length){
  //     endindex = this.todo.length;
  //   }
  //   this.pageslice = this.todo.slice(startindex,endindex);
  // }
  onscroll() {

    this.db.collection('utask' + this._global.userind[0].toString(), ref => ref
    .orderBy("date")
    .limit(3)
    .startAfter(this.lastInResponse)

  )
    .snapshotChanges()
    .subscribe((response) => {

    // this.todo = 

    if (response.length!=0) {
      this.firstInResponse = response[0].payload.doc;
      this.lastInResponse = response[response.length - 1].payload.doc;
    
    
      this.pageslice = response.map(item => {
        return {
          
          id: item.payload.doc.data()
        }
      })
   
      var j = this.todo.length;
      for(let i=0;i<this.pageslice.length;i++)
      {
        this.todo[j] = this.pageslice[i];
        j++; 
      }
      console.log(this.todo);
     } });
     
  
  


}
  duser: any = [];
  dtodo: any = [];
  getass(newtaskLabel, state, daate, userid) {
    if (newtaskLabel == "") {
      alert('must add task');
    }
    if (state == "") {
      alert('must add state');
    }
    if (daate == "") {
      alert('must add date');
    }
    if (userid == "") {
      alert('must add date');
    }
    else {
      this.db.collection('users').doc(userid.toString()).valueChanges().subscribe(
        res => {
          this.duser = res;
          console.log(this.duser);
          //firebase.firestore().collection('users').doc(userid.toString()).set({...this.duser});
          //this.settd(userid);
        });
    }
    var newtask = {
      label: newtaskLabel,
      St: state,
      date: new Date(daate).toISOString(),
      assign: this.user,

    };

    console.log(this.duser);
    this.dtodo = this.duser.task || [];
    this.dtodo.push(newtask);
    this.duser.task = this.dtodo;
    console.log(this.dtodo);
    firebase.firestore().collection('users').doc(userid.toString()).update({ ...this.duser });
  }
  settd(userid) {
    firebase.firestore().collection('users').doc(userid.toString()).set({ ...this.duser });
  }
  myControl = new FormControl();
  // options: string[] = ['One', 'Two', 'Three'];

  filteredOptions: Observable<State[]>;



  private _filter(value: string): State[] {
    const filterValue = value.toLowerCase();



    return this.current.filter(option => option.St.toLowerCase().indexOf(filterValue) === 0);

  }
}
