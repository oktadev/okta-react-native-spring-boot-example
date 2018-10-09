import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import WeightActions from '../Redux/WeightRedux'
import UserActions from '../Redux/UserRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import t from 'tcomb-form-native'

// Styles
import styles from './Styles/WeightEntityEditScreenStyle'

let Form = t.form.Form

class WeightEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      updating: props.entityId !== null && props.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        timestamp: t.Date,
        weight: t.Number,
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
            onSubmitEditing: () => this.refs.form.getComponent('weight').refs.input.focus()
          },
          weight: {
          }
        }
      },
      success: false,
      weight: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.entityId) {
      this.props.getWeight(this.props.entityId)
    } else {
      this.setState({formValue: null})
    }
    this.props.getAllUsers()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.weight && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.weight)
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
        this.props.getAllWeights({page: 0, sort: 'id,asc', size: 20})
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
      weight: value.weight || null,
      userId: (value.user && value.user.id) ? value.user.id : null
    }
  }
  formValueToEntity = (value) => {
    return {
      id: value.id || null,
      timestamp: value.timestamp || null,
      weight: value.weight || null,
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
    const weight = this.refs.form.getValue()
    if (weight) { // if validation fails, value will be null
      this.props.updateWeight(this.formValueToEntity(weight))
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
    weight: state.weights.weight,
    fetching: state.weights.fetchingOne,
    updating: state.weights.updating,
    error: state.weights.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: (options) => dispatch(UserActions.userAllRequest(options)),
    getWeight: (id) => dispatch(WeightActions.weightRequest(id)),
    getAllWeights: (options) => dispatch(WeightActions.weightAllRequest(options)),
    updateWeight: (weight) => dispatch(WeightActions.weightUpdateRequest(weight))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeightEntityEditScreen)
