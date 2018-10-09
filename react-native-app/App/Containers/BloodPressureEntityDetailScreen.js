import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import BloodPressureActions from '../Redux/BloodPressureRedux'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/BloodPressureEntityDetailScreenStyle'

class BloodPressureEntityDetailScreen extends React.Component {
  constructor (context, props) {
    super(context, props)
    this.state = {
      entityId: props.entityId,
      bloodPressure: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getBloodPressure(this.props.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.bloodPressure) {
      this.setState({ bloodPressure: newProps.bloodPressure })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllBloodPressures()
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
      'Delete BloodPressure?',
      'Are you sure you want to delete the BloodPressure?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteBloodPressure(this.props.entityId)
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
        <Text>Timestamp: {String(this.state.bloodPressure.timestamp)}</Text>
        <Text>Systolic: {this.state.bloodPressure.systolic}</Text>
        <Text>Diastolic: {this.state.bloodPressure.diastolic}</Text>
        <RoundedButton text='Edit' onPress={NavigationActions.bloodPressureEntityEdit.bind(this, { entityId: this.state.bloodPressure.id })} />
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
