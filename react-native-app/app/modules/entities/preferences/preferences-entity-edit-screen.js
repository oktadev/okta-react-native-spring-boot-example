import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import PreferenceActions from './preferences.reducer'
import UserActions from '../../../shared/reducers/user.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { preferenceEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './preferences-entity-edit-screen-style'

let Form = t.form.Form
const Units = t.enums({
  KG: 'KG',
  LB: 'LB'
})

class PreferenceEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        weeklyGoal: t.Number,
        weightUnits: Units,
        userId: this.getUsers()
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          userId: {
            testID: 'userIdInput',
            label: 'User'
          },
          weeklyGoal: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('weightUnits').refs.input.focus(),
            testID: 'weeklyGoalInput'
          },
          weightUnits: {
            testID: 'weightUnitsInput'
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
    if (this.props.data.entityId) {
      this.props.getPreference(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
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
        this.props.getAllPreferences({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.preference.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: preferenceEntityDetailScreen.bind(this, { entityId })
          })
        }
        this.setState({
          success: true,
          requesting: false,
          formValue: { id: null }
        })
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
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
    const entity = {
      id: value.id || null,
      weeklyGoal: value.weeklyGoal || null,
      weightUnits: value.weightUnits || null
    }
    if (value.userId) {
      entity.user = { id: value.userId }
    }
    return entity
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
        <ScrollView style={styles.container} testID='entityScrollView'>
          <Form
            ref='form'
            type={this.state.formModel}
            options={this.state.formOptions}
            value={this.state.formValue}
            onChange={this.formChange}
          />
          <TouchableHighlight style={styles.button} onPress={this.submitForm} underlayColor='#99d9f4' testID='submitButton'>
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
