import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { PrimeNgModule } from './primeng/prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UsersComponent } from './pages/users/users.component';
import { PagesModule } from './pages/pages.module';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    FormComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNgModule,
    PagesModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
