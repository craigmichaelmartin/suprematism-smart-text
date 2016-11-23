import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { OverviewComponent } from './overview.component';
import { AllComponent } from './all.component';
import { CommonComponent } from './common.component';
import { SimpleComponent } from './simple.component';
import { StaticComponent } from './static.component';
import { DefaultComponent, DefaultStartEmptyComponent } from './default.component';
import { ForcedValueComponent, ForcedValueStartEmptyComponent } from './forced-value.component';
import { SmartTextModule } from '../../src/index';

const routes = [
  { path: '', component: OverviewComponent },
  { path: 'static', component: StaticComponent },
  { path: 'simple', component: SimpleComponent },
  { path: 'default', component: DefaultComponent},
  { path: 'default-empty', component: DefaultStartEmptyComponent},
  { path: 'forced-value', component: ForcedValueComponent },
  { path: 'forced-value-empty', component: ForcedValueStartEmptyComponent },
  { path: 'common', component: CommonComponent },
  { path: 'all', component: AllComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AllComponent,
    CommonComponent,
    SimpleComponent,
    StaticComponent,
    DefaultComponent,
    DefaultStartEmptyComponent,
    ForcedValueComponent,
    ForcedValueStartEmptyComponent,
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
