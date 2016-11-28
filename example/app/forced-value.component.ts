import { Component } from '@angular/core';

declare var require: any;

@Component({
  template: require('./forced-value.component.html'),
  styles: [require('./simple.component.css')]
})
export class ForcedValueStartEmptyComponent {
    text = '';
    notes = 'Just some notes which doubles as example text underneath the component. FEATURES: Rows + Editable + Placeholder + Forced (with no initial text)';
}

@Component({
  template: require('./forced-value.component.html'),
  styles: [require('./simple.component.css')]
})
export class ForcedValueComponent {
    text = 'I ponder of something great. My lungs will fill and deflate. They fill with fire, exhale desire. I know it\'s dire my time today.';
    notes = 'Just some notes which doubles as example text underneath the component. FEATURES: Rows + Editable + Placeholder + Forced (with no initial text)';
}
