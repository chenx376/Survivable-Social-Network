import { browser, element, by } from 'protractor';

export class Sv4EsnViewPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
