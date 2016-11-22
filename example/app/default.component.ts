import { Component } from '@angular/core';

declare var require: any;

@Component({
  template: require('./default.component.html')
})
export class DefaultComponent {}
