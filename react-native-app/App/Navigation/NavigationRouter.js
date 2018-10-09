import React, { Component } from 'react'
import { Drawer, Scene, Router, Stack } from 'react-native-router-flux'
import styles from './Styles/NavigationContainerStyles'
import DrawerContent from '../Containers/DrawerContent'

// screens identified by the router
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/LoginScreen'
import RegisterScreen from '../Containers/RegisterScreen'
import EntitiesScreen from '../Containers/EntitiesScreen'
import SettingsScreen from '../Containers/SettingsScreen'
import ChangePasswordScreen from '../Containers/ChangePasswordScreen'
import ForgotPasswordScreen from '../Containers/ForgotPasswordScreen'
import PointEntityScreen from '../Containers/PointEntityScreen'
import PointEntityDetailScreen from '../Containers/PointEntityDetailScreen'
import PointEntityEditScreen from '../Containers/PointEntityEditScreen'
import BloodPressureEntityScreen from '../Containers/BloodPressureEntityScreen'
import BloodPressureEntityDetailScreen from '../Containers/BloodPressureEntityDetailScreen'
import BloodPressureEntityEditScreen from '../Containers/BloodPressureEntityEditScreen'
import WeightEntityScreen from '../Containers/WeightEntityScreen'
import WeightEntityDetailScreen from '../Containers/WeightEntityDetailScreen'
import WeightEntityEditScreen from '../Containers/WeightEntityEditScreen'
import PreferenceEntityScreen from '../Containers/PreferenceEntityScreen'
import PreferenceEntityDetailScreen from '../Containers/PreferenceEntityDetailScreen'
import PreferenceEntityEditScreen from '../Containers/PreferenceEntityEditScreen'
// ignite-jhipster-navigation-import-needle

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Drawer headerTintColor={'white'} contentComponent={DrawerContent} navigationBarStyle={styles.navBar} titleStyle={styles.title}
          // these lines are a workaround for a react-navigation issue, remove after upgrading >4.0.0-beta.24
          drawerOpenRoute='DrawerOpen'
          drawerCloseRoute='DrawerClose'
          drawerToggleRoute='DrawerToggle'
        >
          <Stack key='root'>
            <Scene initial key='launchScreen' component={LaunchScreen} title='Welcome' />
            <Scene key='login' component={LoginScreen} title='Login' hideNavBar drawerLockMode='locked-closed' />
            <Scene key='register' component={RegisterScreen} title='Register' back drawerLockMode='locked-closed' />
            <Scene key='entities' component={EntitiesScreen} title='Entities' back drawerLockMode='locked-closed' />
            <Scene key='settings' component={SettingsScreen} title='Settings' back drawerLockMode='locked-closed' />
            <Scene key='changePassword' component={ChangePasswordScreen} title='Change Password' back drawerLockMode='locked-closed' />
            <Scene key='forgotPassword' component={ForgotPasswordScreen} title='Forgot Password' back drawerLockMode='locked-closed' />
            <Scene key='pointEntity' component={PointEntityScreen} title='Points' back drawerLockMode='locked-closed' />
            <Scene key='pointEntityDetail' component={PointEntityDetailScreen} title='Point' back drawerLockMode='locked-closed' />
            <Scene key='pointEntityEdit' component={PointEntityEditScreen} title='Point' back drawerLockMode='locked-closed' />
            <Scene key='bloodPressureEntity' component={BloodPressureEntityScreen} title='BloodPressures' back drawerLockMode='locked-closed' />
            <Scene key='bloodPressureEntityDetail' component={BloodPressureEntityDetailScreen} title='BloodPressure' back drawerLockMode='locked-closed' />
            <Scene key='bloodPressureEntityEdit' component={BloodPressureEntityEditScreen} title='BloodPressure' back drawerLockMode='locked-closed' />
            <Scene key='weightEntity' component={WeightEntityScreen} title='Weights' back drawerLockMode='locked-closed' />
            <Scene key='weightEntityDetail' component={WeightEntityDetailScreen} title='Weight' back drawerLockMode='locked-closed' />
            <Scene key='weightEntityEdit' component={WeightEntityEditScreen} title='Weight' back drawerLockMode='locked-closed' />
            <Scene key='preferenceEntity' component={PreferenceEntityScreen} title='Preferences' back drawerLockMode='locked-closed' />
            <Scene key='preferenceEntityDetail' component={PreferenceEntityDetailScreen} title='Preference' back drawerLockMode='locked-closed' />
            <Scene key='preferenceEntityEdit' component={PreferenceEntityEditScreen} title='Preference' back drawerLockMode='locked-closed' />
            {/* ignite-jhipster-navigation-needle */}
          </Stack>
        </Drawer>
      </Router>
    )
  }
}

export default NavigationRouter
