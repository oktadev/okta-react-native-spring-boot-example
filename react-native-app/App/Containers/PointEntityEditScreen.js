import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import PointActions from '../Redux/PointRedux'
import UserActions from '../Redux/UserRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { jsDateToLocalDate } from '../Transforms/DateTransforms'

import t from 'tcomb-form-native'

// Styles
import styles from './Styles/PointEntityEditScreenStyle'

let Form = t.form.Form

class PointEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      updating: props.entityId !== null && props.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        date: t.Date,
        exercise: t.maybe(t.Boolean),
        meals: t.maybe(t.Boolean),
        alcohol: t.maybe(t.Boolean),
        notes: t.maybe(t.String),
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
          date: {
            mode: 'date',
            config: {
              format: date => jsDateToLocalDate(date)
            },
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('exercise').refs.input.focus()
          },
          exercise: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('meals').refs.input.focus()
          },
          meals: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('alcohol').refs.input.focus()
          },
          alcohol: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('notes').refs.input.focus()
          },
          notes: {
          }
        }
      },
      success: false,
      point: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.entityId) {
      this.props.getPoint(this.props.entityId)
    } else {
      this.setState({formValue: {date: new Date(), exercise: true, meals: true, alcohol: true}})
    }
    this.props.getAllUsers()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.point && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.point)
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
        this.props.getAllPoints({page: 0, sort: 'id,asc', size: 20})
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
      date: value.date || null,
      exercise: value.exercise === 1 ? true : false,
      meals: value.meals === 1 ? true : false,
      alcohol: value.alcohol === 1 ? true : false,
      notes: value.notes || null,
      userId: (value.user && value.user.id) ? value.user.id : null
    }
  }
  formValueToEntity = (value) => {
    return {
      id: value.id || null,
      date: value.date || null,
      exercise: (value.exercise) ? 1 : 0,
      meals: (value.meals) ? 1 : 0,
      alcohol: (value.alcohol) ? 1 : 0,
      notes: value.notes || null,
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
    const point = this.refs.form.getValue()
    if (point) { // if validation fails, value will be null
      this.props.updatePoint(this.formValueToEntity(point))
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
    point: state.points.point,
    fetching: state.points.fetchingOne,
    updating: state.points.updating,
    error: state.points.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: (options) => dispatch(UserActions.userAllRequest(options)),
    getPoint: (id) => dispatch(PointActions.pointRequest(id)),
    getAllPoints: (options) => dispatch(PointActions.pointAllRequest(options)),
    updatePoint: (point) => dispatch(PointActions.pointUpdateRequest(point))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PointEntityEditScreen)
