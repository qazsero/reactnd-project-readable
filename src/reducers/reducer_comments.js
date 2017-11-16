import {COMMENTS_GET, COMMENT_CREATE, COMMENT_EDIT, COMMENT_UPVOTE, COMMENT_DOWNVOTE, COMMENT_DELETE} from '../actions/index'

export default function (state=[], action) {
  switch(action.type) {
    case COMMENT_CREATE:
      return [...state, action.payload.data]
    case COMMENTS_GET:
      return action.payload.data
    case COMMENT_EDIT:
      return state.map((spost) => spost.id === action.payload.data.id ? action.payload.data : spost)
    case COMMENT_DELETE:
      return state.filter((spost) => spost.id !== action.payload)
    case COMMENT_UPVOTE:
      return state.map((spost) => spost.id === action.id ? {...spost, voteScore: spost.voteScore+1} : spost)
    case COMMENT_DOWNVOTE:
      return state.map((spost) => spost.id === action.id ? {...spost, voteScore: spost.voteScore-1} : spost)
    default:
      return state
  }
}
