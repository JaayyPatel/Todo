import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { NbSidebarService } from '@nebular/theme';
var testObject ={name:"test", time:"Date 2017-02-03T08:38:04.449Z"};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Todo-List';
  // toggleSidebar(): boolean {
  //   this.sidebarService.toggle(true, 'menu-sidebar');
  //   this.layoutService.changeLayoutSize();

  //   return false;
  // }
  constructor(private sidebarService: NbSidebarService) {
  }

  toggle() :boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }
  items: NbMenuItem[] = [
    {
      title: 'Login',
      icon: { icon: 'log-in-outline', pack: 'eva' },
      link : '/login',
    },
    {
      title: 'Register',
      icon: 'lock-outline',
      link : '/register',
    },
    {
      title: 'Add Staes',
      icon: { icon: 'checkmark-outline', pack: 'eva' },
      link : '/states',
    },
    {
      title: 'Logout',
      icon: 'unlock-outline',
      link : '/login',
    },
  ];


}
