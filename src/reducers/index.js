import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import PostsReducer from './reducer_posts'
import CommentsReducer from './reducer_comments'
import CategoriesReducer from './reducer_categories'
import PostOrderReducer from './reducer_postOrder'


const rootReducer = combineReducers({
  posts: PostsReducer,
  comments: CommentsReducer,
  categories: CategoriesReducer,
  postOrder: PostOrderReducer,
  form: formReducer,
})

export default rootReducer
