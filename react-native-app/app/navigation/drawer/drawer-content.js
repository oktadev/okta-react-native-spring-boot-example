import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, Image, BackHandler } from 'react-native'
import { Navigation } from 'react-native-navigation'

import { entitiesScreen } from '../layouts'
import { connect } from 'react-redux'

import styles from './drawer-content.styles'
import { Images } from '../../shared/themes'
import DrawerButton from './drawer-button'
import LoginActions from '../../modules/login/login.reducer'
import { isLoggedIn } from '../../shared/reducers/account.reducer'

class DrawerContent extends Component {
  constructor (context, props) {
    super(context, props)
    Navigation.events().bindComponent(this)
  }

  hideSideMenu () {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          visible: false
        }
      }
    })
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.hideSideMenu()
    })
  }

  handlePressLogin = () => {
    this.hideSideMenu()
    this.props.login()
  }
  handlePressEntities = () => {
    this.hideSideMenu()
    entitiesScreen()
  }
  handlePressLogout = () => {
    this.hideSideMenu()
    this.props.logout()
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Image testID='drawerLogo' source={Images.logoJhipster} style={styles.logo} />
        {!this.props.loggedIn && (<DrawerButton testID='loginDrawerButton' text='Login' onPress={this.handlePressLogin} />)}

        {this.props.loggedIn && (<DrawerButton testID='entitiesDrawerButton' text='Entities' onPress={this.handlePressEntities} />)}
        {this.props.loggedIn && (<DrawerButton testID='logoutDrawerButton' text='Logout' onPress={this.handlePressLogout} />)}
      </ScrollView>
    )
  }
}

DrawerContent.contextTypes = {
  drawer: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    loggedIn: isLoggedIn(state.account)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(LoginActions.loginRequest()),
    logout: () => dispatch(LoginActions.logoutRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
