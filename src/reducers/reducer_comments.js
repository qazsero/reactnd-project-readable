import {COMMENTS_GET, COMMENT_CREATE, COMMENT_EDIT, COMMENT_UPVOTE, COMMENT_DOWNVOTE, COMMENT_DELETE} from '../actions/types'

export default function (state=[], action) {
  switch(action.type) {
    case COMMENT_CREATE:
      return [...state, action.payload.data]
    case COMMENTS_GET:
      return action.payload.data
    case COMMENT_EDIT:
      return state.map((scomment) => scomment.id === action.payload.data.id ? action.payload.data : scomment)
    case COMMENT_DELETE:
      return state.filter((scomment) => scomment.id !== action.payload)
    case COMMENT_UPVOTE:
      return state.map((scomment) => scomment.id === action.id ? {...scomment, voteScore: scomment.voteScore+1} : scomment)
    case COMMENT_DOWNVOTE:
      return state.map((scomment) => scomment.id === action.id ? {...scomment, voteScore: scomment.voteScore-1} : scomment)
    default:
      return state
  }
}
