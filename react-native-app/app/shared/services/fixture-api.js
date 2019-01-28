export default {
  // Functions return fixtures

  // entity fixtures
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
