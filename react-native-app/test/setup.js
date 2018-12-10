import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Config from '../app/config/debug-config'

Config.useReactotron = false
configure({ adapter: new Adapter() })

// Mock your external modules here if needed
jest
  .mock('react-native-navigation', () => {
    return { Navigation: { showModal: jest.fn((url) => { return [] }) } }
  })
  .mock('react-native-app-auth', () => {
    return { authorize: jest.fn(() => { return {} }) }
  })

console.tron = { log: () => {}, display: () => {} }
