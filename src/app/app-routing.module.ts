import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users-list/users-list.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

const routes: Routes = [
  {path:"users",component:UsersComponent},
  {path: 'login', component: LoginPageComponent },

  {
    component:UsersComponent,path:""
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
