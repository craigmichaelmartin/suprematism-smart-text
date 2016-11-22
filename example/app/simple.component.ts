import { Component } from '@angular/core';

declare var require: any;

@Component({
  template: require('./simple.component.html')
})
export class SimpleComponent {}
