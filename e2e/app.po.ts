import { browser, by, element } from 'protractor';

export class IndexedDBSamplePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('db-test-root h1')).getText();
  }
}
