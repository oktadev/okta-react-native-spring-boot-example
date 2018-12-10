import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { bloodPressureEntityEditScreen } from '../../../navigation/layouts'

import BloodPressureActions from './blood-pressure.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './blood-pressure-entity-detail-screen-style'

class BloodPressureEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      bloodPressure: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getBloodPressure(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.bloodPressure) {
      this.setState({ bloodPressure: newProps.bloodPressure })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllBloodPressures()
        Navigation.pop(this.props.componentId)
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
      'Delete BloodPressure?',
      'Are you sure you want to delete the BloodPressure?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteBloodPressure(this.props.data.entityId)
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
        <Text>ID: {this.state.bloodPressure.id}</Text>
        <Text testID='timestamp'>Timestamp: {String(this.state.bloodPressure.timestamp)}</Text>
        <Text testID='systolic'>Systolic: {this.state.bloodPressure.systolic}</Text>
        <Text testID='diastolic'>Diastolic: {this.state.bloodPressure.diastolic}</Text>
        <RoundedButton text='Edit' onPress={bloodPressureEntityEditScreen.bind(this, { entityId: this.state.bloodPressure.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bloodPressure: state.bloodPressures.bloodPressure,
    deleting: state.bloodPressures.deleting,
    errorDeleting: state.bloodPressures.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBloodPressure: (id) => dispatch(BloodPressureActions.bloodPressureRequest(id)),
    getAllBloodPressures: (options) => dispatch(BloodPressureActions.bloodPressureAllRequest(options)),
    deleteBloodPressure: (id) => dispatch(BloodPressureActions.bloodPressureDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BloodPressureEntityDetailScreen)
