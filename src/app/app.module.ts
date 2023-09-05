import {
  NgModule
} from '@angular/core';
import {
  BrowserModule
} from '@angular/platform-browser';

import {
  AppRoutingModule
} from './app-routing.module';
import {
  AppComponent
} from './app.component';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
  MaterialModule
} from 'src/MaterialModule';
import {
  CreateUserComponent
} from './components/user-create/create-user.component';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  HttpClient,
  HttpClientModule
} from '@angular/common/http';
import {
  UsersComponent
} from './components/users-list/users-list.component';
import {
  LoginPageComponent
} from './components/login-page/login-page.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/local/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    CreateUserComponent,
    LoginPageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
