import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import rootReducer from '../reducers'

const appStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk)
)

export default appStore
