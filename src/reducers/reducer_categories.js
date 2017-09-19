import {CAT_GET} from '../actions/index'

export default function (state=[], action) {
  switch(action.type) {
    case CAT_GET:
      return action.payload.data.categories
    default:
      return state
  }
}
