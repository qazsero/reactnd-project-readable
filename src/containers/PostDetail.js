import React, {Component} from 'react'
import Moment from 'react-moment'
import {Link} from 'react-router-dom'
import _ from 'lodash'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import FontAwesome from 'react-fontawesome'
import crypto from 'crypto'
import * as actions from '../actions'

import PostComment from '../components/PostComment'

class PostDetail extends Component {
  state = {
    isEditOpen: false,
    editTitle: '',
    editBody: '',
  }

  componentWillMount(){
    let postid = this.props.match.params.postid
    this.props.getPost(postid)
    this.props.getComments(postid)
  }

  componentWillReceiveProps(nextProps){
    if(!_.isEmpty(nextProps.post)){
      this.setState({editTitle:nextProps.post.title, editBody:nextProps.post.body})
    }
  }

  /* Acciones sobre el state y modal */

  onPostEditClick = () => {
    this.setState({isEditOpen:true})
  }

  handleEditPostTitle = (event) => {
    this.setState({editTitle: event.target.value})
  }

  handleEditPostBody = (event) => {
    this.setState({editBody: event.target.value})
  }

  updatePost = () => {
    let values = {}
    let id = this.props.match.params.postid
    values.title = this.state.editTitle
    values.body = this.state.editBody
    this.props.editPost(id, values)
    this.closeEditModal()
  }

  closeEditModal = () => {
    this.setState({isEditOpen:false})
  }

  postModalClass = () => {
    let openModal = this.state.isEditOpen ? 'is-active' : ''
    return `modal ${openModal}`
  }


  /* Acciones de publicación */

  onPostDeleteClick = () => {
    const {postid} = this.props.match.params
    this.props.deletePost(postid, () => {
      this.props.history.push('/')
    })
  }


  /* Acciones de comentarios */

  onCommentSubmit = (values) => {
    values.timestamp = Date.now()
    values.id = crypto.randomBytes(16).toString("hex")
    values.parentId = this.props.match.params.postid

    //console.log(values)
    this.props.createComment(values)
  }

  render(){
    const { handleSubmit} = this.props;


    //Post Object filtering
    let post = {}
    let activePost = this.props.posts.filter((p) => p.id===this.props.match.params.postid && p.deleted === false)
    if(activePost.length === 1) post = activePost[0]

    //Comments filtering
    let comments = this.props.comments.filter((c) => c.parentId === this.props.match.params.postid)

    //Comprobamos si la id del post existe
    if(_.isEmpty(post)){
      return (
        <div>
          <h3>This post has been deleted. <Link to="/">Go back</Link></h3>
        </div>
      )
    }

    //Timestamp formating
    let formatedTimeStamp = 0
    if(typeof post.timestamp === 'number') formatedTimeStamp = post.timestamp.toString().slice(0,-3)

    return(
      <div className="column is-10 is-offset-1">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">
              {post.title}
            </p>
          </header>
          <div className="card-content">
            <div className="columns">
              <div className="column is-1 text-center" style={{borderRight:"1px solid #DBDBDB"}}>
                <h3 className="is-size-4" >{post.voteScore}</h3>
                <p>votes</p>
                <nav className="level is-mobile" style={{marginTop:"10px"}}>
                  <div className="level-left">
                    <a className="level-item">
                      <span className="icon is-small" onClick={() => this.props.votePosPost(post.id)} ><FontAwesome name='thumbs-o-up' /></span>
                    </a>
                    <a className="level-item">
                      <span className="icon is-small" onClick={() => this.props.voteNegPost(post.id)} ><FontAwesome name='thumbs-o-down' /></span>
                    </a>
                  </div>
                </nav>
              </div>
              <div className="column is-10 content">
                {post.body}
              </div>
            </div>
          </div>
          <footer className="card-footer">
            <p className="card-footer-item">
              @{post.author}
            </p>
            <p className="card-footer-item">
              <Moment format="MMM Do YY hh:mm" unix>{formatedTimeStamp}</Moment>
            </p>
            <a onClick={this.onPostEditClick} className="card-footer-item">Edit</a>
            <a onClick={this.onPostDeleteClick} className="card-footer-item is-danger">Delete</a>
          </footer>
          <div className={this.postModalClass()}>
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Edit this post</p>
                <button onClick={() => this.closeEditModal()}  className="delete" aria-label="close"></button>
              </header>
              <section className="modal-card-body">
                <input className="input" onChange={this.handleEditPostTitle} value={this.state.editTitle} />
                <textarea className="textarea" onChange={this.handleEditPostBody} value={this.state.editBody}></textarea>
              </section>
              <footer className="modal-card-foot">
                <button onClick={() => this.updatePost()} className="button is-success">Save changes</button>
                <button onClick={() => this.closeEditModal()}  className="button">Cancel</button>
              </footer>
            </div>
          </div>
        </div>

        <section className="section" id="media">
          <h4 className="title">Comments</h4>
          <hr/>

          {comments.map((comment) => <PostComment
                                        key={comment.id}
                                        comment={comment}
                                        votePosComment={this.props.votePosComment}
                                        voteNegComment={this.props.voteNegComment}
                                        deleteComment={this.props.deleteComment}
                                        updateComment={this.props.editComment}
                                      />
          )}

          <hr/>
          <article className="media">
            <div className="media-content">
              <form onSubmit={handleSubmit(this.onCommentSubmit)}>
              <div className="field">
                <p className="control is-4 column" style={{padding:0}}>
                  <Field className="input" type="text" name="author" placeholder="Author" component="input" />
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <Field className="textarea" name="body" placeholder="Add a comment..." component="textarea" />
                </p>
              </div>
              <nav className="level">
                <div className="level-left">
                  <div className="level-item">
                    <button type="submit" className="button is-info">Post comment</button>
                  </div>
                </div>
              </nav>
              </form>
            </div>
          </article>
        </section>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    posts:state.posts,
    comments: state.comments,
  }
}

function validate(values){
  const errors = {}

  //Validamos los inputs desde 'values'
  if(!values.author) {
    errors.author = "Insert a username"
  }

  if(!values.body) {
    errors.body = "Write a message"
  }

  //Si errors está vacio, el formulario está listo para enviarse
  //Si errors tiene alguna propiedad, redux form asume que el formulario es inválido
  return errors
}

export default reduxForm({
  validate,
  form: 'CommentsForm'
})(
  connect(mapStateToProps, actions)(PostDetail)
)
