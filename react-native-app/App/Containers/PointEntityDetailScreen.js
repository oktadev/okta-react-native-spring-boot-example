import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import PointActions from '../Redux/PointRedux'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { jsDateToLocalDate } from '../Transforms/DateTransforms'

// Styles
import styles from './Styles/PointEntityDetailScreenStyle'

class PointEntityDetailScreen extends React.Component {
  constructor (context, props) {
    super(context, props)
    this.state = {
      entityId: props.entityId,
      point: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getPoint(this.props.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.point) {
      this.setState({ point: newProps.point })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllPoints()
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
      'Delete Point?',
      'Are you sure you want to delete the Point?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deletePoint(this.props.entityId)
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
        <Text>Date: {jsDateToLocalDate(this.state.point.date)}</Text>
        <Text>Exercise: {this.state.point.exercise}</Text>
        <Text>Meals: {this.state.point.meals}</Text>
        <Text>Alcohol: {this.state.point.alcohol}</Text>
        <Text>Notes: {this.state.point.notes}</Text>
        <RoundedButton text='Edit' onPress={NavigationActions.pointEntityEdit.bind(this, { entityId: this.state.point.id })} />
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
