import { Component } from '@angular/core';

declare var require: any;

@Component({
  selector: 'supre-root',
  template: require('./common.component.html'),
  styles: [require('./all.component.css')]
})
export class CommonComponent {

  longTitle: string = 'This is a long title. It seems to be quite a long bit of text. I am surpised I am able to come up with a sentence with no fore-thought; i wonder what this sentence says about my sub-conscious. Who knows. Not I. Or Id. I hope that is a pun.';

  mediumTitle: string = 'This is a medium title. It is quite a big bit of text that ends promptly.';

  shortTitle: string = "This is a short title. It's not terribly long.";

  belowText: string = 'Here is example text underneath. La di dah.';

  placeholderText: string = 'Please enter a title name';

  defaultText: string = 'Automated Splendidly Awesome Default Title (1)';

}
