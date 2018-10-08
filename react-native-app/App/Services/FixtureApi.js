export default {
  // Functions return fixtures

  // entity fixtures
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
