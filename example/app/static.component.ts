import { Component } from '@angular/core';

declare var require: any;

@Component({
  template: require('./static.component.html'),
  styles: [require('./simple.component.css')]
})
export class StaticComponent {}
