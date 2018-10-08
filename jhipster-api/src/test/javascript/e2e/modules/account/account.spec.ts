/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import SignInPage from '../../page-objects/signin-page';
import NavBarPage from '../../page-objects/navbar-page';
import { waitUntilDisplayed } from '../../util/utils';

const expect = chai.expect;

describe('Account', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  const loginPageTitle = 'login-title';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
  });

  it('should fail to login with bad password', async () => {
    await signInPage.loginWithOAuth('admin', 'foo');
    const alert = element(by.css('.alert-error'));
    if (await alert.isPresent()) {
      // Keycloak
      expect(await alert.getText()).to.eq('Invalid username or password.');
    } else {
      // Okta
      const error = element(by.css('.infobox-error'));
      await waitUntilDisplayed(error);
      expect(await error.getText()).to.eq('Sign in failed!');
    }
    await signInPage.clearUserName();
    await signInPage.clearPassword();
  });

  it('should login with admin account', async () => {
    // Keycloak credentials by default, change them to be able to use oauth2 with Okta
    await signInPage.loginWithOAuth('admin', 'admin');
    const success = element(by.className('alert-success'));
    await waitUntilDisplayed(success);

    // Success alert should appear in home page
    expect(await success.isPresent()).to.be.true;
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
