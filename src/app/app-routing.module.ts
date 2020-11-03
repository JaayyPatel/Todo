import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { stateComponent } from './states';
import { RegisterComponent } from './register';
import { LogComponent } from './login';
import { AdminComponent} from './admin';
import { UserComponent} from './user';
import { VerifyComponent } from './verify/verify.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
   { path: 'states', component: stateComponent },
   { path: 'register', component: RegisterComponent },
   { path: '', component: LogComponent },
   { path: 'admin', component: AdminComponent },
   { path: 'user', component: UserComponent },
   { path: 'verify', component: VerifyComponent },
   // otherwise redirect to home
   { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
