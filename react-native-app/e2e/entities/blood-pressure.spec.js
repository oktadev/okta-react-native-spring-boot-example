const Utils = require('../utils')

describe('BloodPressure Screen Tests', () => {
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
    await navigateToBloodPressureScreen()
  })

  const navigateToBloodPressureScreen = async () => {
    await expect(element(by.id('launchScreen'))).toBeVisible()
    await element(by.id('menuButton')).tap()
    await element(by.id('entitiesDrawerButton')).tap()
    await element(by.id('bloodPressureEntityScreenButton')).tap()
  }

  it('should allow you to create an entity', async () => {
    await expect(element(by.id('bloodPressureScreen'))).toBeVisible()
    await expect(element(by.text('Create'))).toBeVisible()
    // create
    await element(by.text('Create').and(by.type('UIButtonLabel'))).tap()
    await element(by.id('systolicInput')).replaceText('123')
    await element(by.id('diastolicInput')).replaceText('123')
    await waitFor(element(by.id('submitButton'))).toBeVisible().whileElement(by.id('entityScrollView')).scroll(50, 'down')
    await element(by.id('submitButton')).tap()
    await element(by.text('View')).tap()
    await expect(element(by.id('systolic'))).toHaveText('Systolic: 123')
    await expect(element(by.id('diastolic'))).toHaveText('Diastolic: 123')
    // update
    await element(by.text('EDIT')).tap()
    await element(by.id('systolicInput')).replaceText('1234')
    await element(by.id('diastolicInput')).replaceText('1234')
    await waitFor(element(by.id('submitButton'))).toBeVisible().whileElement(by.id('entityScrollView')).scroll(50, 'down')
    await element(by.id('submitButton')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('systolic'))).toHaveText('Systolic: 1234')
    await expect(element(by.id('diastolic'))).toHaveText('Diastolic: 1234')
    // delete
    await element(by.text('DELETE')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('bloodPressureScreen'))).toBeVisible()
  })
})
