const Utils = require('../utils')

describe('Point Screen Tests', () => {
  before(async () => {
    await device.reloadReactNative()
    await Utils.loginAsUser()
  })
  after(async () => {
    await element(by.type('_UIBackButtonContainerView')).tap()
    await element(by.type('_UIBackButtonContainerView')).tap()
    await Utils.logout()
  })

  beforeEach(async () => {
    await device.reloadReactNative()
    await navigateToPointScreen()
  })

  const navigateToPointScreen = async () => {
    await expect(element(by.id('launchScreen'))).toBeVisible()
    await element(by.id('menuButton')).tap()
    await element(by.id('entitiesDrawerButton')).tap()
    await element(by.id('pointEntityScreenButton')).tap()
  }

  it('should allow you to create an entity', async () => {
    await expect(element(by.id('pointScreen'))).toBeVisible()
    await expect(element(by.text('Create'))).toBeVisible()
    // create
    await element(by.text('Create').and(by.type('UIButtonLabel'))).tap()
    await element(by.id('exerciseInput')).replaceText('123')
    await element(by.id('mealsInput')).replaceText('123')
    await element(by.id('alcoholInput')).replaceText('123')
    await element(by.id('notesInput')).replaceText('sample-data')
    await waitFor(element(by.id('submitButton'))).toBeVisible().whileElement(by.id('entityScrollView')).scroll(50, 'down')
    await element(by.id('submitButton')).tap()
    await element(by.text('View')).tap()
    await expect(element(by.id('exercise'))).toHaveText('Exercise: 123')
    await expect(element(by.id('meals'))).toHaveText('Meals: 123')
    await expect(element(by.id('alcohol'))).toHaveText('Alcohol: 123')
    await expect(element(by.id('notes'))).toHaveText('Notes: sample-data')
    // update
    await element(by.text('EDIT')).tap()
    await element(by.id('exerciseInput')).replaceText('1234')
    await element(by.id('mealsInput')).replaceText('1234')
    await element(by.id('alcoholInput')).replaceText('1234')
    await element(by.id('notesInput')).replaceText('sample-data-2')
    await waitFor(element(by.id('submitButton'))).toBeVisible().whileElement(by.id('entityScrollView')).scroll(50, 'down')
    await element(by.id('submitButton')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('exercise'))).toHaveText('Exercise: 1234')
    await expect(element(by.id('meals'))).toHaveText('Meals: 1234')
    await expect(element(by.id('alcohol'))).toHaveText('Alcohol: 1234')
    await expect(element(by.id('notes'))).toHaveText('Notes: sample-data-2')
    // delete
    await element(by.text('DELETE')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('pointScreen'))).toBeVisible()
  })
})
