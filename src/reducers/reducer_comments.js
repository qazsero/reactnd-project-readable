import {COMMENTS_GET, COMMENT_CREATE, COMMENT_EDIT, COMMENT_DELETE} from '../actions/index'

export default function (state=[], action) {
  switch(action.type) {
    case COMMENT_CREATE:
      return [...state, action.payload.data]
    case COMMENTS_GET:
      return action.payload.data
    case COMMENT_EDIT:
      return state.filter((spost) => spost.id !== action.payload)
    case COMMENT_DELETE:
      return state.filter((spost) => spost.id !== action.payload)
    default:
      return state
  }
}
