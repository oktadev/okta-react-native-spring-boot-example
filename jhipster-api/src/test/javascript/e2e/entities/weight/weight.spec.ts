/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import WeightComponentsPage from './weight.page-object';
import { WeightDeleteDialog } from './weight.page-object';
import WeightUpdatePage from './weight-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Weight e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let weightUpdatePage: WeightUpdatePage;
  let weightComponentsPage: WeightComponentsPage;
  let weightDeleteDialog: WeightDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Weights', async () => {
    await navBarPage.getEntityPage('weight');
    weightComponentsPage = new WeightComponentsPage();
    expect(await weightComponentsPage.getTitle().getText()).to.match(/Weights/);
  });

  it('should load create Weight page', async () => {
    await weightComponentsPage.clickOnCreateButton();
    weightUpdatePage = new WeightUpdatePage();
    expect(await weightUpdatePage.getPageTitle().getAttribute('id')).to.match(/healthPointsApp.weight.home.createOrEditLabel/);
  });

  it('should create and save Weights', async () => {
    const nbButtonsBeforeCreate = await weightComponentsPage.countDeleteButtons();

    await weightUpdatePage.setTimestampInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await weightUpdatePage.getTimestampInput()).to.contain('2001-01-01T02:30');
    await weightUpdatePage.setWeightInput('5');
    expect(await weightUpdatePage.getWeightInput()).to.eq('5');
    await weightUpdatePage.userSelectLastOption();
    await waitUntilDisplayed(weightUpdatePage.getSaveButton());
    await weightUpdatePage.save();
    await waitUntilHidden(weightUpdatePage.getSaveButton());
    expect(await weightUpdatePage.getSaveButton().isPresent()).to.be.false;

    await weightComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await weightComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Weight', async () => {
    await weightComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await weightComponentsPage.countDeleteButtons();
    await weightComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    weightDeleteDialog = new WeightDeleteDialog();
    expect(await weightDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/healthPointsApp.weight.delete.question/);
    await weightDeleteDialog.clickOnConfirmButton();

    await weightComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await weightComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
