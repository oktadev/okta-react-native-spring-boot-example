import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { pointEntityEditScreen } from '../../../navigation/layouts'
import { jsDateToLocalDate } from '../../../shared/util/date-transforms'

import PointActions from './points.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './points-entity-detail-screen-style'

class PointEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      point: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getPoint(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.point) {
      this.setState({ point: newProps.point })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllPoints()
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
      'Delete Point?',
      'Are you sure you want to delete the Point?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deletePoint(this.props.data.entityId)
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
        <Text>ID: {this.state.point.id}</Text>
        <Text testID='date'>Date: {jsDateToLocalDate(this.state.point.date)}</Text>
        <Text testID='exercise'>Exercise: {this.state.point.exercise}</Text>
        <Text testID='meals'>Meals: {this.state.point.meals}</Text>
        <Text testID='alcohol'>Alcohol: {this.state.point.alcohol}</Text>
        <Text testID='notes'>Notes: {this.state.point.notes}</Text>
        <RoundedButton text='Edit' onPress={pointEntityEditScreen.bind(this, { entityId: this.state.point.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    point: state.points.point,
    deleting: state.points.deleting,
    errorDeleting: state.points.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPoint: (id) => dispatch(PointActions.pointRequest(id)),
    getAllPoints: (options) => dispatch(PointActions.pointAllRequest(options)),
    deletePoint: (id) => dispatch(PointActions.pointDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PointEntityDetailScreen)
