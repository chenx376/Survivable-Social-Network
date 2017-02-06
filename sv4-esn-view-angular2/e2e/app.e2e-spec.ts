import { Sv4EsnViewPage } from './app.po';

describe('sv4-esn-view App', function() {
  let page: Sv4EsnViewPage;

  beforeEach(() => {
    page = new Sv4EsnViewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
