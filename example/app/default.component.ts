import { Component } from '@angular/core';

declare var require: any;

@Component({
  template: require('./default.component.html'),
  styles: [require('./simple.component.css')]
})
export class DefaultComponent {}
