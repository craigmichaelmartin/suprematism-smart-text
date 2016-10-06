import { SuprematismSmartTextPage } from './app.po';

describe('suprematism-smart-text App', function() {
  let page: SuprematismSmartTextPage;

  beforeEach(() => {
    page = new SuprematismSmartTextPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
