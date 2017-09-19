import {POST_GET,POST_UPVOTE,POST_DOWNVOTE} from '../actions/index'

export default function (state=[], action) {
  switch(action.type) {
    case POST_GET:
      return action.payload.data
    case POST_UPVOTE:
      return state.map((spost) => spost.id === action.postId ? {...spost, voteScore: spost.voteScore+1} : spost)
    case POST_DOWNVOTE:
      return state.map((spost) => spost.id === action.postId ? {...spost, voteScore: spost.voteScore-1} : spost)
    default:
      return state
  }
}
