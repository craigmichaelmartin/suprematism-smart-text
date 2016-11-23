import { Component } from '@angular/core';

declare var require: any;

@Component({
  template: require('./default.component.html'),
  styles: [require('./simple.component.css')]
})
export class DefaultStartEmptyComponent {

    text = '';
    notes = 'Just some notes which doubles as example text underneath the component. FEATURES: Rows + Editable + Placeholder + Default (with no initial text)';
}

@Component({
  template: require('./default.component.html'),
  styles: [require('./simple.component.css')]
})
export class DefaultComponent {

    text = 'I ponder of something great. My lungs will fill and deflate. They fill with fire, exhale desire. I know it is dire my time today.';
    notes = 'Just some notes which doubles as example text underneath the component. FEATURES: Rows + Editable + Placeholder + Default';

}
