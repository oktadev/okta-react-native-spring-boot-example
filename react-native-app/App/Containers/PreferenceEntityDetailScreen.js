import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import PreferenceActions from '../Redux/PreferenceRedux'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/PreferenceEntityDetailScreenStyle'

class PreferenceEntityDetailScreen extends React.Component {
  constructor (context, props) {
    super(context, props)
    this.state = {
      entityId: props.entityId,
      preference: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getPreference(this.props.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.preference) {
      this.setState({ preference: newProps.preference })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllPreferences()
        NavigationActions.pop()
      } else {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{text: 'OK'}])
        this.setState({
          success: false,
          requesting: false
        })
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete Preference?',
      'Are you sure you want to delete the Preference?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deletePreference(this.props.entityId)
            })
          }
        }
      ],
      { cancelable: false }
    )
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.state.preference.id}</Text>
        <Text>WeeklyGoal: {this.state.preference.weeklyGoal}</Text>
        <Text>WeightUnits: {this.state.preference.weightUnits}</Text>
        <RoundedButton text='Edit' onPress={NavigationActions.preferenceEntityEdit.bind(this, { entityId: this.state.preference.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    preference: state.preferences.preference,
    deleting: state.preferences.deleting,
    errorDeleting: state.preferences.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPreference: (id) => dispatch(PreferenceActions.preferenceRequest(id)),
    getAllPreferences: (options) => dispatch(PreferenceActions.preferenceAllRequest(options)),
    deletePreference: (id) => dispatch(PreferenceActions.preferenceDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreferenceEntityDetailScreen)
