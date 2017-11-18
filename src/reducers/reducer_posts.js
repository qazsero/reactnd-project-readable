import {POST_GET,POSTS_GET,POST_UPVOTE,POST_DOWNVOTE, POST_CREATE, POST_EDIT, POST_DELETE} from '../actions/types'
import _ from 'lodash'

export default function (state=[], action) {
  switch(action.type) {
    case POST_GET:
      if(typeof action.payload.data === 'undefined' || _.isEmpty(action.payload.data)) return []
      let nstate = state.filter((spost) => spost.id !== action.payload.data.id)
      return [...nstate, action.payload.data]
    case POST_CREATE:
      return [...state, action.payload.data]
    case POSTS_GET:
      return action.payload.data
    case POST_EDIT:
      return state.map((spost) => spost.id === action.payload.data.id ? action.payload.data : spost)
    case POST_DELETE:
      return state.filter((spost) => spost.id !== action.payload)
    case POST_UPVOTE:
      return state.map((spost) => spost.id === action.postId ? {...spost, voteScore: spost.voteScore+1} : spost)
    case POST_DOWNVOTE:
      return state.map((spost) => spost.id === action.postId ? {...spost, voteScore: spost.voteScore-1} : spost)
    default:
      return state
  }
}
