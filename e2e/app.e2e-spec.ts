import { ScaffoldPage } from './app.po';

describe('scaffold App', function() {
  let page: ScaffoldPage;

  beforeEach(() => {
    page = new ScaffoldPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
