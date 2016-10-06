import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SmartTextModule } from '../../src/index';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SmartTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
