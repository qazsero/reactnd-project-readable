import {ORDER_SET} from '../actions/index'

export default function (state='votes', action) {
  switch(action.type) {
    case ORDER_SET:
      return action.payload
    default:
      return state
  }
}
