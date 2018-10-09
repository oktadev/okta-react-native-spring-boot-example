import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import BloodPressureActions from '../Redux/BloodPressureRedux'
import UserActions from '../Redux/UserRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import t from 'tcomb-form-native'

// Styles
import styles from './Styles/BloodPressureEntityEditScreenStyle'

let Form = t.form.Form

class BloodPressureEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      updating: props.entityId !== null && props.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        timestamp: t.Date,
        systolic: t.Number,
        diastolic: t.Number,
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
          timestamp: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('systolic').refs.input.focus()
          },
          systolic: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('diastolic').refs.input.focus()
          },
          diastolic: {
          }
        }
      },
      success: false,
      bloodPressure: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.entityId) {
      this.props.getBloodPressure(this.props.entityId)
    } else {
      this.setState({formValue: null})
    }
    this.props.getAllUsers()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.bloodPressure && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.bloodPressure)
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
        this.props.getAllBloodPressures({page: 0, sort: 'id,asc', size: 20})
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
      timestamp: value.timestamp || null,
      systolic: value.systolic || null,
      diastolic: value.diastolic || null,
      userId: (value.user && value.user.id) ? value.user.id : null
    }
  }
  formValueToEntity = (value) => {
    return {
      id: value.id || null,
      timestamp: value.timestamp || null,
      systolic: value.systolic || null,
      diastolic: value.diastolic || null,
      user: value.userId ? { id: value.userId } : null
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
    const bloodPressure = this.refs.form.getValue()
    if (bloodPressure) { // if validation fails, value will be null
      this.props.updateBloodPressure(this.formValueToEntity(bloodPressure))
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
    bloodPressure: state.bloodPressures.bloodPressure,
    fetching: state.bloodPressures.fetchingOne,
    updating: state.bloodPressures.updating,
    error: state.bloodPressures.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: (options) => dispatch(UserActions.userAllRequest(options)),
    getBloodPressure: (id) => dispatch(BloodPressureActions.bloodPressureRequest(id)),
    getAllBloodPressures: (options) => dispatch(BloodPressureActions.bloodPressureAllRequest(options)),
    updateBloodPressure: (bloodPressure) => dispatch(BloodPressureActions.bloodPressureUpdateRequest(bloodPressure))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BloodPressureEntityEditScreen)
