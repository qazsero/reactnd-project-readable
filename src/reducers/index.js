import {combineReducers} from 'redux'
import PostsReducer from './reducer_posts'
import CategoriesReducer from './reducer_categories'
import postOrderReducer from './reducer_postOrder'


const rootReducer = combineReducers({
  posts: PostsReducer,
  categories: CategoriesReducer,
  postOrder: postOrderReducer
})

export default rootReducer
