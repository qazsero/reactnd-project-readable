import axios from 'axios'
import {POST_GET,POSTS_GET,POST_UPVOTE, POST_DOWNVOTE, CAT_GET, ORDER_SET,POST_CREATE, POST_EDIT,POST_DELETE,COMMENTS_GET,COMMENT_CREATE,COMMENT_UPVOTE,COMMENT_DOWNVOTE,COMMENT_EDIT,COMMENT_DELETE} from './types'

const AUTH_HEADER = 'github:Qazsero'
const ROOT_URL = 'http://localhost:3001'

//Con esto autenticamos el server
axios.defaults.headers.common['Authorization'] = AUTH_HEADER;

export function getPost(id) {

  const request = axios.get(ROOT_URL+'/posts/'+id)

  return{
    type: POST_GET,
    payload: request
  }
}


export function getPosts(cat=0) {

  const request = axios.get(ROOT_URL+'/posts')

  return{
    type: POSTS_GET,
    payload: request
  }
}


export function votePosPost(postId) {

  //Llamada api que lo actualice
  axios.post(ROOT_URL+'/posts/'+postId, {option:'upVote'})

  return{
    type: POST_UPVOTE,
    postId
  }
}

export function voteNegPost(postId) {

  //Llamada api que lo actualice
  axios.post(ROOT_URL+'/posts/'+postId, {option:'downVote'})

  return{
    type: POST_DOWNVOTE,
    postId
  }
}


export function getCategories(){

  const request = axios.get(ROOT_URL+'/categories')

  return{
    type: CAT_GET,
    payload: request
  }
}


export function setPostOrder(orderName){

  return{
    type: ORDER_SET,
    payload: orderName
  }
}


//Creamos un Post
export function createPost(values, callback){

  const request = axios.post(ROOT_URL+'/posts/', values)
  request.then(() => callback())

  return{
    type: POST_CREATE,
    payload: request
  }
}

//Creamos un Post
export function editPost(id, values){

  const request = axios.put(ROOT_URL+'/posts/'+id, values)

  return{
    type: POST_EDIT,
    payload: request
  }
}

//Borramos un Post
export function deletePost(id, callback) {

  const request = axios.delete(ROOT_URL+'/posts/'+id)
  request.then(() => callback())

  return{
    type: POST_DELETE,
    payload: id
  }
}

export function getComments(postId) {

  const request = axios.get(ROOT_URL+'/posts/'+postId+'/comments')

  return{
    type: COMMENTS_GET,
    payload: request
  }
}

//Creamos un Post
export function createComment(values, callback){

  const request = axios.post(ROOT_URL+'/comments', values)

  return{
    type: COMMENT_CREATE,
    payload: request
  }
}

export function votePosComment(id) {

  //Llamada api que lo actualice
  axios.post(ROOT_URL+'/comments/'+id, {option:'upVote'})

  return{
    type: COMMENT_UPVOTE,
    id
  }
}

export function voteNegComment(id) {

  //Llamada api que lo actualice
  axios.post(ROOT_URL+'/comments/'+id, {option:'downVote'})

  return{
    type: COMMENT_DOWNVOTE,
    id
  }
}

//Creamos un Post
export function editComment(id, values){

  const request = axios.put(ROOT_URL+'/comments/'+id, values)

  return{
    type: COMMENT_EDIT,
    payload: request
  }
}

//Borramos un Post
export function deleteComment(id) {

  axios.delete(ROOT_URL+'/comments/'+id)

  return{
    type: COMMENT_DELETE,
    payload: id
  }
}

//Estas funciones son ActionCreator, necesita devolver una acción,
//un objeto con una propiedad `type`
