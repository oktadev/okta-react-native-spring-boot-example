import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { weightEntityEditScreen } from '../../../navigation/layouts'

import WeightActions from './weight.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './weight-entity-detail-screen-style'

class WeightEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      weight: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getWeight(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.weight) {
      this.setState({ weight: newProps.weight })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllWeights()
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
      'Delete Weight?',
      'Are you sure you want to delete the Weight?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteWeight(this.props.data.entityId)
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
        <Text>ID: {this.state.weight.id}</Text>
        <Text testID='timestamp'>Timestamp: {String(this.state.weight.timestamp)}</Text>
        <Text testID='weight'>Weight: {this.state.weight.weight}</Text>
        <RoundedButton text='Edit' onPress={weightEntityEditScreen.bind(this, { entityId: this.state.weight.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    weight: state.weights.weight,
    deleting: state.weights.deleting,
    errorDeleting: state.weights.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getWeight: (id) => dispatch(WeightActions.weightRequest(id)),
    getAllWeights: (options) => dispatch(WeightActions.weightAllRequest(options)),
    deleteWeight: (id) => dispatch(WeightActions.weightDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeightEntityDetailScreen)
