import { element, by, ElementFinder } from 'protractor';

export default class PointsUpdatePage {
  pageTitle: ElementFinder = element(by.id('healthPointsApp.points.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dateInput: ElementFinder = element(by.css('input#points-date'));
  exerciseInput: ElementFinder = element(by.css('input#points-exercise'));
  mealsInput: ElementFinder = element(by.css('input#points-meals'));
  alcoholInput: ElementFinder = element(by.css('input#points-alcohol'));
  notesInput: ElementFinder = element(by.css('input#points-notes'));
  userSelect: ElementFinder = element(by.css('select#points-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return this.dateInput.getAttribute('value');
  }

  async setExerciseInput(exercise) {
    await this.exerciseInput.sendKeys(exercise);
  }

  async getExerciseInput() {
    return this.exerciseInput.getAttribute('value');
  }

  async setMealsInput(meals) {
    await this.mealsInput.sendKeys(meals);
  }

  async getMealsInput() {
    return this.mealsInput.getAttribute('value');
  }

  async setAlcoholInput(alcohol) {
    await this.alcoholInput.sendKeys(alcohol);
  }

  async getAlcoholInput() {
    return this.alcoholInput.getAttribute('value');
  }

  async setNotesInput(notes) {
    await this.notesInput.sendKeys(notes);
  }

  async getNotesInput() {
    return this.notesInput.getAttribute('value');
  }

  async userSelectLastOption() {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
