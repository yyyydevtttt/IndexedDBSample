import { IndexedDBSamplePage } from './app.po';

describe('indexed-dbsample App', () => {
  let page: IndexedDBSamplePage;

  beforeEach(() => {
    page = new IndexedDBSamplePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to db-test!');
  });
});
