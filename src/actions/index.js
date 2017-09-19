import axios from 'axios'

const AUTH_HEADER = 'github:Qazsero'
const ROOT_URL = 'http://localhost:3001'

export const POST_GET = 'POST_GET'
export const POST_UPVOTE = 'POST_UPVOTE'
export const POST_DOWNVOTE = 'POST_DOWNVOTE'

//Con esto autenticamos el server
axios.defaults.headers.common['Authorization'] = AUTH_HEADER;

export function getPosts(cat=0) {

  const request = axios.get(ROOT_URL+'/posts')

  return{
    type: POST_GET,
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

export const CAT_GET = 'CAT_GET'

export function getCategories(){

  const request = axios.get(ROOT_URL+'/categories')

  return{
    type: CAT_GET,
    payload: request
  }
}


export const ORDER_SET = 'ORDER_SET'

export function setPostOrder(orderName){

  return{
    type: ORDER_SET,
    payload: orderName
  }
}

//Estas funciones son ActionCreator, necesita devolver una acción,
//un objeto con una propiedad `type`
