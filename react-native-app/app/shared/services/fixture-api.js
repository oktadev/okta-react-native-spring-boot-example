export default {
  // Functions return fixtures

  // entity fixtures

  updatePoint: (point) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updatePoint.json')
    }
  },
  getPoints: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getPoints.json')
    }
  },
  getPoint: (pointId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getPoint.json')
    }
  },
  deletePoint: (pointId) => {
    return {
      ok: true
    }
  },
  searchPoints: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/searchPoints.json')
    }
  },

  updateBloodPressure: (bloodPressure) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateBloodPressure.json')
    }
  },
  getBloodPressures: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getBloodPressures.json')
    }
  },
  getBloodPressure: (bloodPressureId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getBloodPressure.json')
    }
  },
  deleteBloodPressure: (bloodPressureId) => {
    return {
      ok: true
    }
  },
  searchBloodPressures: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/searchBloodPressures.json')
    }
  },

  updateWeight: (weight) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateWeight.json')
    }
  },
  getWeights: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getWeights.json')
    }
  },
  getWeight: (weightId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getWeight.json')
    }
  },
  deleteWeight: (weightId) => {
    return {
      ok: true
    }
  },
  searchWeights: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/searchWeights.json')
    }
  },

  updatePreference: (preference) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updatePreference.json')
    }
  },
  getPreferences: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getPreferences.json')
    }
  },
  getPreference: (preferenceId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getPreference.json')
    }
  },
  deletePreference: (preferenceId) => {
    return {
      ok: true
    }
  },
  searchPreferences: (query) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/searchPreferences.json')
    }
  },
  // ignite-jhipster-api-fixture-needle

  // user fixtures
  updateUser: (user) => {
    return {
      ok: true,
      data: require('../fixtures/updateUser.json')
    }
  },
  getUsers: () => {
    return {
      ok: true,
      data: require('../fixtures/getUsers.json')
    }
  },
  getUser: (userId) => {
    return {
      ok: true,
      data: require('../fixtures/getUser.json')
    }
  },
  deleteUser: (userId) => {
    return {
      ok: true
    }
  },
  // auth fixtures
  setAuthToken: () => {

  },
  removeAuthToken: () => {

  },
  getOauthInfo: () => {
    return {
      ok: true,
      data: require('../fixtures/get-oauth-info.json')
    }
  },
  register: ({user}) => {
    if (user === 'user') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Invalid email'
      }
    }
  },
  forgotPassword: ({email}) => {
    if (email === 'valid@gmail.com') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Invalid email'
      }
    }
  },
  getAccount: () => {
    return {
      ok: true,
      status: 200,
      data: require('../fixtures/get-account.json')
    }
  },
  updateAccount: () => {
    return {
      ok: true
    }
  },
  changePassword: ({currentPassword}) => {
    if (currentPassword === 'valid-password') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Password error'
      }
    }
  }
}
