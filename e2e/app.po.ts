import { browser, element, by, Key } from 'protractor';

const strip = str => str.replace(/['" ]+/g, '');

export class SuprematismSmartTextPage {

  navigateTo(route = '/') {
    return browser.get(route);
  }

  setBrowserDimensions(width, height) {
    browser.driver.manage().window().setSize(width, height);
  }

  getProjectedTextEl() {
    return this.$(`supre-smart-text .header`);
  }

  getDisplayTextEl() {
    return this.$(`supre-smart-text .SmartText-DisplayText`);
  }

  getEllipsisEl() {
    return this.$(`supre-smart-text .js-shave-char`);
  }

  getEditIconEl() {
    return this.$(`supre-smart-text .SmartText-EditIcon`);
  }

  getConfirmIconEl() {
    return this.$(`supre-smart-text .SmartText-ConfirmIcon`);
  }

  getCancelIconEl() {
    return this.$(`supre-smart-text .SmartText-CancelIcon`);
  }

  getPopoverEl() {
    return this.$(`supre-smart-text .js-shave-char supre-popover`);
  }

  getDisplayEl() {
    return this.$(`supre-smart-text .SmartText-Display`);
  }

  getEditEl() {
    return this.$(`supre-smart-text .SmartText-Edit`);
  }

  getEditAreaEl() {
    return this.$(`supre-smart-text .SmartText-EditArea`);
  }

  getBrowserEllipsisEl() {
    return browser.findElement(by.css('supre-smart-text .js-shave-char'));
  }

  getBrowserCancelIcon() {
    return browser.findElement(by.css('supre-smart-text .SmartText-CancelIcon'));
  }

  getBrowserConfirmIcon() {
    return browser.findElement(by.css('supre-smart-text .SmartText-ConfirmIcon'));
  }

  getBrowserProjectedTextEl() {
    return browser.findElement(by.css('supre-smart-text .header'));
  }

  getBrowserEditAreaEl() {
    return browser.findElement(by.css('supre-smart-text .SmartText-EditArea'));
  }

  getProjectedTextElStyle(property) {
    return this.getProjectedTextEl().getCssValue(property).then(strip);
  }

  getDisplayTextElText() {
    return this.getDisplayTextEl().getText();
  }

  getDisplayTextElStyle(property) {
    return this.getDisplayTextEl().getCssValue(property).then(strip);
  }

  getEditIconElStyle(property) {
    return this.getEditIconEl().getCssValue(property).then(strip);
  }

  getConfirmIconElStyle(property) {
    return this.getConfirmIconEl().getCssValue(property).then(strip);
  }

  getCancelIconElStyle(property) {
    return this.getCancelIconEl().getCssValue(property).then(strip);
  }

  getDisplayElStyle(property) {
    return this.getDisplayEl().getCssValue(property).then(strip);
  }

  getEditElStyle(property) {
    return this.getEditEl().getCssValue(property).then(strip);
  }

  getEditAreaElStyle(property) {
    return this.getEditAreaEl().getCssValue(property).then(strip);
  }

  getPopoverStyle(property) {
    return this.getPopoverEl().getCssValue(property).then(strip);
  }

  getPopoverText() {
    return this.getPopoverEl().getText();
  }

  isEllipsisPresent() {
    return this.getEllipsisEl().isPresent();
  }

  isPopoverPresent() {
    return this.getPopoverEl().isPresent();
  }

  isConfirmIconPresent() {
    return this.getConfirmIconEl().isPresent();
  }

  $(path) {
    return element(by.css(path));
  }

  hoverOnEllipsis() {
    return browser.actions().mouseMove(this.getBrowserEllipsisEl()).perform();
  }

  hoverOnProjectedText() {
    return browser.actions().mouseMove(this.getBrowserProjectedTextEl()).perform();
  }

  clickOnProjectedText() {
    return browser.actions().click(this.getBrowserProjectedTextEl()).perform();
  }

  clickOnCancelIcon() {
    return browser.actions().click(this.getBrowserCancelIcon()).perform();
  }

  clickOnConfirmIcon() {
    return browser.actions().click(this.getBrowserConfirmIcon()).perform();
  }

  changeEditTextArea(text) {
    this.getEditAreaEl().clear();
    return this.getEditAreaEl().sendKeys(text);
  }

  clearEditTextArea() {
    this.getEditAreaEl().clear();
    this.getEditAreaEl().sendKeys('');
    return browser.actions().click(this.getBrowserEditAreaEl()).sendKeys(Key.BACK_SPACE).perform();
  }

  hitEnterKeyInTextArea() {
    return browser.actions().click(this.getBrowserEditAreaEl()).sendKeys(Key.ENTER).perform();
  }
}
