import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { OverviewComponent } from './overview.component';
import { AllComponent } from './all.component';
import { SimpleComponent } from './simple.component';
import { DefaultComponent } from './default.component';
import { ForcedValueComponent } from './forced-value.component';
import { SmartTextModule } from '../../src/index';

const routes = [
  { path: '', component: OverviewComponent },
  { path: 'simple', component: SimpleComponent },
  { path: 'default', component: DefaultComponent},
  { path: 'forced-value', component: ForcedValueComponent },
  { path: 'all', component: AllComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AllComponent,
    SimpleComponent,
    DefaultComponent,
    ForcedValueComponent,
    OverviewComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    SmartTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
