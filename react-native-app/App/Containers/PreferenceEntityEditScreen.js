import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import PreferenceActions from '../Redux/PreferenceRedux'
import UserActions from '../Redux/UserRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import t from 'tcomb-form-native'

// Styles
import styles from './Styles/PreferenceEntityEditScreenStyle'

let Form = t.form.Form
const Units = t.enums({
  KG: 'KG',
  LB: 'LB'
})

class PreferenceEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      updating: props.entityId !== null && props.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        weeklyGoal: t.Number,
        weightUnits: Units,
        userId: this.getUsers()
      }),
      formValue: { },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          userId: {
            label: 'User'
          },
          weeklyGoal: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('weightUnits').refs.input.focus()
          },
          weightUnits: {
          }
        }
      },
      success: false,
      preference: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.entityId) {
      this.props.getPreference(this.props.entityId)
    } else {
      this.setState({formValue: null})
    }
    this.props.getAllUsers()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.preference && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.preference)
      })
    }

    // Did the update attempt complete?
    if (!newProps.updating && this.state.requesting) {
      if (newProps.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{text: 'OK'}])
        this.setState({
          success: false,
          requesting: false
        })
      } else {
        this.setState({
          success: true,
          requesting: false,
          formValue: {}
        })
        Alert.alert('Success', 'Entity saved successfully', [{text: 'OK'}])
        this.props.getAllPreferences({page: 0, sort: 'id,asc', size: 20})
        NavigationActions.pop()
      }
    }
  }

  // convenience methods for customizing the mapping of the entity to/from the form value
  entityToFormValue = (value) => {
    if (!value) {
      return {}
    }
    return {
      id: value.id || null,
      weeklyGoal: value.weeklyGoal || null,
      weightUnits: value.weightUnits || null,
      userId: (value.user && value.user.id) ? value.user.id : null
    }
  }
  formValueToEntity = (value) => {
    return {
      id: value.id || null,
      weeklyGoal: value.weeklyGoal || null,
      weightUnits: value.weightUnits || null,
      user: {
        id: value.userId || null
      }
    }
  }

  getUsers = () => {
    const users = {}
    this.props.users.forEach(user => {
      users[user.id] = user.login ? user.login.toString() : user.id.toString()
    })
    return t.maybe(t.enums(users))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const preference = this.refs.form.getValue()
    if (preference) { // if validation fails, value will be null
      this.props.updatePreference(this.formValueToEntity(preference))
    }
  }

  formChange (newValue) {
    this.setState({
      formValue: newValue
    })
  }

  render () {
    return (
      <KeyboardAwareScrollView>
        <ScrollView style={styles.container}>
          <Form
            ref='form'
            type={this.state.formModel}
            options={this.state.formOptions}
            value={this.state.formValue}
            onChange={this.formChange}
          />
          <TouchableHighlight style={styles.button} onPress={this.submitForm} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </ScrollView>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users || [],
    preference: state.preferences.preference,
    fetching: state.preferences.fetchingOne,
    updating: state.preferences.updating,
    error: state.preferences.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: (options) => dispatch(UserActions.userAllRequest(options)),
    getPreference: (id) => dispatch(PreferenceActions.preferenceRequest(id)),
    getAllPreferences: (options) => dispatch(PreferenceActions.preferenceAllRequest(options)),
    updatePreference: (preference) => dispatch(PreferenceActions.preferenceUpdateRequest(preference))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreferenceEntityEditScreen)
