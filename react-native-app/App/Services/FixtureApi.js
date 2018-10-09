export default {
  // Functions return fixtures

  // entity fixtures

  updatePoint: (point) => {
    return {
      ok: true,
      data: require('../Fixtures/updatePoint.json')
    }
  },
  getPoints: () => {
    return {
      ok: true,
      data: require('../Fixtures/getPoints.json')
    }
  },
  getPoint: (pointId) => {
    return {
      ok: true,
      data: require('../Fixtures/getPoint.json')
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
      data: require('../Fixtures/searchPoints.json')
    }
  },

  updateBloodPressure: (bloodPressure) => {
    return {
      ok: true,
      data: require('../Fixtures/updateBloodPressure.json')
    }
  },
  getBloodPressures: () => {
    return {
      ok: true,
      data: require('../Fixtures/getBloodPressures.json')
    }
  },
  getBloodPressure: (bloodPressureId) => {
    return {
      ok: true,
      data: require('../Fixtures/getBloodPressure.json')
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
      data: require('../Fixtures/searchBloodPressures.json')
    }
  },

  updateWeight: (weight) => {
    return {
      ok: true,
      data: require('../Fixtures/updateWeight.json')
    }
  },
  getWeights: () => {
    return {
      ok: true,
      data: require('../Fixtures/getWeights.json')
    }
  },
  getWeight: (weightId) => {
    return {
      ok: true,
      data: require('../Fixtures/getWeight.json')
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
      data: require('../Fixtures/searchWeights.json')
    }
  },

  updatePreference: (preference) => {
    return {
      ok: true,
      data: require('../Fixtures/updatePreference.json')
    }
  },
  getPreferences: () => {
    return {
      ok: true,
      data: require('../Fixtures/getPreferences.json')
    }
  },
  getPreference: (preferenceId) => {
    return {
      ok: true,
      data: require('../Fixtures/getPreference.json')
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
      data: require('../Fixtures/searchPreferences.json')
    }
  },
  // ignite-jhipster-api-fixture-needle

  // user fixtures
  updateUser: (user) => {
    return {
      ok: true,
      data: require('../Fixtures/updateUser.json')
    }
  },
  getUsers: () => {
    return {
      ok: true,
      data: require('../Fixtures/getUsers.json')
    }
  },
  getUser: (userId) => {
    return {
      ok: true,
      data: require('../Fixtures/getUser.json')
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
      data: require('../Fixtures/getOauthInfo.json')
    }
  },
  getOauthIssuerInfo: () => {
    return {
      ok: true,
      data: require('../Fixtures/getOauthIssuerInfo.json')
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
      data: require('../Fixtures/getAccount.json')
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
