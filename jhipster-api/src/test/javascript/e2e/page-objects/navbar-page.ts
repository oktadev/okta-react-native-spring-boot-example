import { $, ElementFinder } from 'protractor';

import BasePage from './base-component';
import SignInPage from './signin-page';

const selector: ElementFinder = $('#app-header');
export default class NavBarPage extends BasePage {
  selector: ElementFinder;
  signInPage: SignInPage;
  adminMenu: ElementFinder = this.selector.$('#admin-menu');
  accountMenu: ElementFinder = this.selector.$('#account-menu');
  entityMenu: ElementFinder = this.selector.$('#entity-menu');
  loginItem: ElementFinder = this.selector.$('#login-item');

  constructor() {
    super(selector);
    this.selector = selector;
    this.signInPage = new SignInPage();
  }

  async getSignInPage() {
    await this.clickOnAccountMenu();
    await this.loginItem.click();
    return this.signInPage;
  }

  async getEntityPage(entityName: string) {
    await this.clickOnEntityMenu();
    await this.clickOnEntity(entityName);
  }

  async clickOnTabMenu(item: string) {
    await this.selector
      .$('#header-tabs')
      .$(`.dropdown-item[href="${item}"]`)
      .click();
  }

  async clickOnAccountMenu() {
    await this.accountMenu.click();
  }

  async clickOnAccountMenuItem(item: string) {
    await this.accountMenu.click();
    await this.selector.$(`.dropdown-item[href="#/account/${item}"`).click();
  }

  async clickOnAdminMenuItem(item: string) {
    await this.adminMenu.click();
    await this.selector.$(`.dropdown-item[href="#/admin/${item}"]`).click();
  }

  async clickOnEntityMenu() {
    await this.entityMenu.click();
  }

  async clickOnEntity(entityName: string) {
    await this.selector.$(`.dropdown-item[href="#/entity/${entityName}"]`).click();
  }

  async autoSignIn() {
    await this.signInPage.get();
    this.signInPage.loginWithOAuth('admin', 'admin');
  }

  async autoSignOut() {
    await this.signInPage.autoSignOut();
  }
}
