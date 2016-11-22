import { Component } from '@angular/core';

declare var require: any;

@Component({
  template: require('./forced-value.component.html'),
  styles: [require('./simple.component.css')]
})
export class ForcedValueComponent {}
