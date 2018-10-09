import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import WeightActions from '../Redux/WeightRedux'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/WeightEntityDetailScreenStyle'

class WeightEntityDetailScreen extends React.Component {
  constructor (context, props) {
    super(context, props)
    this.state = {
      entityId: props.entityId,
      weight: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getWeight(this.props.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.weight) {
      this.setState({ weight: newProps.weight })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllWeights()
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
      'Delete Weight?',
      'Are you sure you want to delete the Weight?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteWeight(this.props.entityId)
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
        <Text>Timestamp: {String(this.state.weight.timestamp)}</Text>
        <Text>Weight: {this.state.weight.weight}</Text>
        <RoundedButton text='Edit' onPress={NavigationActions.weightEntityEdit.bind(this, { entityId: this.state.weight.id })} />
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
