import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, Image, BackHandler } from 'react-native'
import styles from './Styles/DrawerContentStyles'
import { Images } from '../Themes'
import DrawerButton from '../Components/DrawerButton'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import LoginActions from '../Redux/LoginRedux'
import { isLoggedIn } from '../Redux/AccountRedux'

class DrawerContent extends Component {
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      NavigationActions.drawerClose()
    })
  }

  handlePressLogin = () => {
    NavigationActions.drawerClose()
    this.props.login()
  }
  handlePressEntities = () => {
    NavigationActions.drawerClose()
    NavigationActions.entities()
  }
  handlePressLogout = () => {
    NavigationActions.drawerClose()
    this.props.logout()
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Image source={Images.logoJhipster} style={styles.logo} />
        {!this.props.loggedIn && (<DrawerButton text='Login' onPress={this.handlePressLogin} />)}

        {this.props.loggedIn && (<DrawerButton text='Entities' onPress={this.handlePressEntities} />)}
        {this.props.loggedIn && (<DrawerButton text='Logout' onPress={this.handlePressLogout} />)}
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
