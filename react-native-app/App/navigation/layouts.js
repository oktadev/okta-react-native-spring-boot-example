import { AppState, Linking } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import { Images } from '../shared/themes'
// import { StorybookUIRoot } from '../../storybook'

import createStore from '../shared/reducers'
import Colors from '../shared/themes/colors'
import '../config/reactotron-config'
import AccountActions from '../shared/reducers/account.reducer'

import LoginScreen from '../modules/login/login-screen'
import LaunchScreen from '../modules/home/launch-screen'
import DrawerContent from './drawer/drawer-content'
import SettingsScreen from '../modules/account/settings/settings-screen'
import RegisterScreen from '../modules/account/register/register-screen'
import ForgotPasswordScreen from '../modules/account/password-reset/forgot-password-screen'
import ChangePasswordScreen from '../modules/account/password/change-password-screen'
import EntitiesScreen from '../modules/entities/entities-screen'
import PointEntityScreen from '../modules/entities/points/points-entity-screen'
import PointEntityDetailScreen from '../modules/entities/points/points-entity-detail-screen'
import PointEntityEditScreen from '../modules/entities/points/points-entity-edit-screen'
import BloodPressureEntityScreen from '../modules/entities/blood-pressure/blood-pressure-entity-screen'
import BloodPressureEntityDetailScreen from '../modules/entities/blood-pressure/blood-pressure-entity-detail-screen'
import BloodPressureEntityEditScreen from '../modules/entities/blood-pressure/blood-pressure-entity-edit-screen'
import WeightEntityScreen from '../modules/entities/weight/weight-entity-screen'
import WeightEntityDetailScreen from '../modules/entities/weight/weight-entity-detail-screen'
import WeightEntityEditScreen from '../modules/entities/weight/weight-entity-edit-screen'
import PreferenceEntityScreen from '../modules/entities/preferences/preferences-entity-screen'
import PreferenceEntityDetailScreen from '../modules/entities/preferences/preferences-entity-detail-screen'
import PreferenceEntityEditScreen from '../modules/entities/preferences/preferences-entity-edit-screen'
// ignite-jhipster-navigation-import-needle

export const LOGIN_SCREEN = 'nav.LoginScreen'
export const REGISTER_SCREEN = 'nav.RegisterScreen'
export const FORGOT_PASSWORD_SCREEN = 'nav.ForgotPasswordScreen'
export const CHANGE_PASSWORD_SCREEN = 'nav.ChangePasswordScreen'
export const SETTINGS_SCREEN = 'nav.SettingsScreen'
export const LAUNCH_SCREEN = 'nav.LaunchScreen'
export const DRAWER_CONTENT = 'nav.DrawerContent'
export const ENTITIES_SCREEN = 'nav.EntitiesScreen'
export const POINT_ENTITY_SCREEN = 'Nav.PointEntityScreen'
export const POINT_ENTITY_DETAIL_SCREEN = 'Nav.PointEntityDetailScreen'
export const POINT_ENTITY_EDIT_SCREEN = 'Nav.PointEntityEditScreen'
export const BLOOD_PRESSURE_ENTITY_SCREEN = 'Nav.BloodPressureEntityScreen'
export const BLOOD_PRESSURE_ENTITY_DETAIL_SCREEN = 'Nav.BloodPressureEntityDetailScreen'
export const BLOOD_PRESSURE_ENTITY_EDIT_SCREEN = 'Nav.BloodPressureEntityEditScreen'
export const WEIGHT_ENTITY_SCREEN = 'Nav.WeightEntityScreen'
export const WEIGHT_ENTITY_DETAIL_SCREEN = 'Nav.WeightEntityDetailScreen'
export const WEIGHT_ENTITY_EDIT_SCREEN = 'Nav.WeightEntityEditScreen'
export const PREFERENCE_ENTITY_SCREEN = 'Nav.PreferenceEntityScreen'
export const PREFERENCE_ENTITY_DETAIL_SCREEN = 'Nav.PreferenceEntityDetailScreen'
export const PREFERENCE_ENTITY_EDIT_SCREEN = 'Nav.PreferenceEntityEditScreen'
// ignite-jhipster-navigation-declaration-needle

const store = createStore()

export const appStack = {
  root: {
    sideMenu: {
      left: {
        component: {
          name: DRAWER_CONTENT
        }
      },
      center: {
        stack: {
          id: 'center',
          children: [{
            component: {
              name: LAUNCH_SCREEN,
              options: {
                topBar: {
                  title: {
                    text: 'Welcome!',
                    color: Colors.snow
                  },
                  leftButtons: [
                    {
                      id: 'menuButton',
                      icon: Images.menuIcon,
                      testID: 'menuButton'
                    }
                  ]
                }
              }
            }
          }]
        }
      }
    }
  }
}

let lastAppState = 'active'
function handleAppStateChange (nextAppState) {
  if (lastAppState.match(/inactive|background/) && nextAppState === 'active') {
    refreshAccount(store)
  }
  lastAppState = nextAppState
}

function refreshAccount () {
  store.dispatch(AccountActions.accountRequest())
}
// for deep linking
function handleOpenURL (event) {
  console.tron.log(event.url)
  let splitUrl = event.url.split('/')             // ['https:', '', 'domain', 'route', 'params']
  let importantParameters = splitUrl.splice(3)    // ['route', 'params']
  if (importantParameters.length === 0) {
    console.tron.log('Sending to home page')
    return null
  }
  if (importantParameters.length === 1) {
    switch (importantParameters[0]) {
      case 'register':
        console.tron.log(`Sending to Register Page`)
        registerScreen()
        break
      default:
        console.tron.warn(`Unhandled deep link: ${event.url}`)
      // default code block
    }
  }
}

export function registerScreensAndStartApp () {
  Navigation.registerComponentWithRedux(LOGIN_SCREEN, () => LoginScreen, Provider, store)
  Navigation.registerComponentWithRedux(REGISTER_SCREEN, () => RegisterScreen, Provider, store)
  Navigation.registerComponentWithRedux(FORGOT_PASSWORD_SCREEN, () => ForgotPasswordScreen, Provider, store)
  Navigation.registerComponentWithRedux(CHANGE_PASSWORD_SCREEN, () => ChangePasswordScreen, Provider, store)
  Navigation.registerComponentWithRedux(SETTINGS_SCREEN, () => SettingsScreen, Provider, store)
  Navigation.registerComponentWithRedux(DRAWER_CONTENT, () => DrawerContent, Provider, store)
  Navigation.registerComponentWithRedux(LAUNCH_SCREEN, () => LaunchScreen, Provider, store)
  Navigation.registerComponentWithRedux(ENTITIES_SCREEN, () => EntitiesScreen, Provider, store)
  Navigation.registerComponentWithRedux(POINT_ENTITY_SCREEN, () => PointEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(POINT_ENTITY_DETAIL_SCREEN, () => PointEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(POINT_ENTITY_EDIT_SCREEN, () => PointEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(BLOOD_PRESSURE_ENTITY_SCREEN, () => BloodPressureEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(BLOOD_PRESSURE_ENTITY_DETAIL_SCREEN, () => BloodPressureEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(BLOOD_PRESSURE_ENTITY_EDIT_SCREEN, () => BloodPressureEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(WEIGHT_ENTITY_SCREEN, () => WeightEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(WEIGHT_ENTITY_DETAIL_SCREEN, () => WeightEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(WEIGHT_ENTITY_EDIT_SCREEN, () => WeightEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(PREFERENCE_ENTITY_SCREEN, () => PreferenceEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(PREFERENCE_ENTITY_DETAIL_SCREEN, () => PreferenceEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(PREFERENCE_ENTITY_EDIT_SCREEN, () => PreferenceEntityEditScreen, Provider, store)
  // ignite-jhipster-navigation-registration-needle

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
      topBar: {
        topBar: {
          title: {
            color: Colors.snow
          }
        },
        backButton: {
          showTitle: false,
          testID: 'backButton',
          icon: Images.chevronLeftIcon,
          color: Colors.snow,
          iconColor: Colors.snow
        },
        background: {
          color: Colors.background
        }
      },
      sideMenu: {
        left: {
          enabled: false
        }
      }
    })

    Navigation.setRoot(appStack)

    // handle app state and deep links
    AppState.addEventListener('change', handleAppStateChange)
    Linking.addEventListener('url', handleOpenURL)
  })
}

export const loginScreen = () => Navigation.showModal({
  stack: {
    children: [{
      component: {
        name: LOGIN_SCREEN,
        options: {
          topBar: {
            visible: false,
            drawBehind: true
          }
        }
      }
    }]
  }
})

export const registerScreen = () => Navigation.push('center', {
  component: {
    name: REGISTER_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Sign Up',
          color: Colors.snow
        }
      }
    }
  }
})

export const forgotPasswordScreen = () => Navigation.push('center', {
  component: {
    name: FORGOT_PASSWORD_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Forgot Password',
          color: Colors.snow
        }
      }
    }
  }
})
export const changePasswordScreen = () => Navigation.push('center', {
  component: {
    name: CHANGE_PASSWORD_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Change Password',
          color: Colors.snow
        }
      }
    }
  }
})
export const settingsScreen = () => Navigation.push('center', {
  component: {
    name: SETTINGS_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Settings',
          color: Colors.snow
        }
      }
    }
  }
})

export const entitiesScreen = () => Navigation.push('center', {
  component: {
    name: ENTITIES_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Entities',
          color: Colors.snow
        }
      }
    }
  }
})

export const pointEntityScreen = () => Navigation.push('center', {
  component: {
    name: POINT_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Points',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const pointEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: POINT_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Points',
          color: Colors.snow
        }
      }
    }
  }
})

export const pointEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: POINT_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Points',
          color: Colors.snow
        }
      }
    }
  }
})

export const bloodPressureEntityScreen = () => Navigation.push('center', {
  component: {
    name: BLOOD_PRESSURE_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'BloodPressures',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const bloodPressureEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: BLOOD_PRESSURE_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'BloodPressures',
          color: Colors.snow
        }
      }
    }
  }
})

export const bloodPressureEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: BLOOD_PRESSURE_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'BloodPressures',
          color: Colors.snow
        }
      }
    }
  }
})

export const weightEntityScreen = () => Navigation.push('center', {
  component: {
    name: WEIGHT_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Weights',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const weightEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: WEIGHT_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Weights',
          color: Colors.snow
        }
      }
    }
  }
})

export const weightEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: WEIGHT_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Weights',
          color: Colors.snow
        }
      }
    }
  }
})

export const preferenceEntityScreen = () => Navigation.push('center', {
  component: {
    name: PREFERENCE_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Preferences',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const preferenceEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: PREFERENCE_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Preferences',
          color: Colors.snow
        }
      }
    }
  }
})

export const preferenceEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: PREFERENCE_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Preferences',
          color: Colors.snow
        }
      }
    }
  }
})
// ignite-jhipster-navigation-method-needle
