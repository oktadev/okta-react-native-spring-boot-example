import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
// Styles
import styles from './Styles/EntitiesScreenStyle'
import RoundedButton from '../Components/RoundedButton' // eslint-disable-line
import { Actions as NavigationActions } from 'react-native-router-flux' // eslint-disable-line

class EntitiesScreen extends React.Component {
  render () {
    return (
      <ScrollView style={styles.container}>
        <Text style={{ textAlign: 'center' }}>JHipster Entities will appear below</Text>
        <RoundedButton text='Point' onPress={NavigationActions.pointEntity} />
        <RoundedButton text='BloodPressure' onPress={NavigationActions.bloodPressureEntity} />
        <RoundedButton text='Weight' onPress={NavigationActions.weightEntity} />
        <RoundedButton text='Preference' onPress={NavigationActions.preferenceEntity} />
        {/* ignite-jhipster-entity-screen-needle */}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // for developer convenience
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // for developer convenience
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntitiesScreen)
