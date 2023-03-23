import {AppPage} from './app.po';

describe('App test', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', async () => {
    await page.navigateTo();
    void expect(await page.getParagraphText()).toEqual('Welcome to app!');
  });
});
