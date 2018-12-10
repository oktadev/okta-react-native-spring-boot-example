import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
// Styles
/*eslint-disable */
import RoundedButton from '../../shared/components/rounded-button/rounded-button'
import {
  pointEntityScreen,
  bloodPressureEntityScreen,
  weightEntityScreen,
  preferenceEntityScreen,
  // ignite-jhipster-entity-screen-import-needle
} from '../../navigation/layouts'
/*eslint-enable */

import styles from './entities-screen.styles'

class EntitiesScreen extends React.Component {
  render () {
    return (
      <ScrollView style={styles.container}>
        <Text style={{ textAlign: 'center' }}>JHipster Entities will appear below</Text>
        <RoundedButton text='Point' onPress={pointEntityScreen} testID='pointEntityScreenButton' />
        <RoundedButton text='BloodPressure' onPress={bloodPressureEntityScreen} testID='bloodPressureEntityScreenButton' />
        <RoundedButton text='Weight' onPress={weightEntityScreen} testID='weightEntityScreenButton' />
        <RoundedButton text='Preference' onPress={preferenceEntityScreen} testID='preferenceEntityScreenButton' />
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
