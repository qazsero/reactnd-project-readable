import React, {Component} from 'react'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {Link} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import crypto from 'crypto'
import {getPost, deletePost,votePosPost,voteNegPost, getComments, createComment, editComment, votePosComment, voteNegComment, deleteComment} from '../actions'

class PostDetail extends Component {

  componentDidMount(){
    let postid = this.props.match.params.postid
    this.props.getPost(postid)
    this.props.getComments(postid)
  }

  onPostDeleteClick = () => {
    const {postid} = this.props.match.params
    this.props.deletePost(postid, () => {
      this.props.history.push('/')
    })
  }

  onCommentDeleteClick = (commid) => {
    this.props.deleteComment(commid)
  }

  onCommentSubmit = (values) => {
    values.timestamp = Date.now()
    values.id = crypto.randomBytes(16).toString("hex")
    values.parentId = this.props.match.params.postid

    //console.log(values)
    this.props.createComment(values)
  }

  render(){
    const { handleSubmit } = this.props;
    let formatedTimeStamp = 0
    if(typeof this.props.post.timestamp === 'number') formatedTimeStamp = this.props.post.timestamp.toString().slice(0,-3)

    return(
      <div className="column is-10 is-offset-1">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">
              {this.props.post.title}
            </p>
          </header>
          <div className="card-content">
            <div className="columns">
              <div className="column is-1 text-center" style={{borderRight:"1px solid #DBDBDB"}}>
                <h3 className="is-size-4" >{this.props.post.voteScore}</h3>
                <p>votes</p>
                <nav className="level is-mobile" style={{marginTop:"10px"}}>
                  <div className="level-left">
                    <a className="level-item">
                      <span className="icon is-small" onClick={() => this.props.votePosPost(this.props.post.id)} ><FontAwesome name='thumbs-o-up' /></span>
                    </a>
                    <a className="level-item">
                      <span className="icon is-small" onClick={() => this.props.voteNegPost(this.props.post.id)} ><FontAwesome name='thumbs-o-down' /></span>
                    </a>
                  </div>
                </nav>
              </div>
              <div className="column is-10 content">
                {this.props.post.body}
              </div>
            </div>
          </div>
          <footer className="card-footer">
            <p className="card-footer-item">
              @{this.props.post.author}
            </p>
            <p className="card-footer-item">
              <Moment format="MMM Do YY hh:mm" unix>{formatedTimeStamp}</Moment>
            </p>
            <Link to="/" className="card-footer-item">Edit</Link>
            <a onClick={this.onPostDeleteClick} className="card-footer-item is-danger">Delete</a>
          </footer>
        </div>

        <section className="section" id="media">
          <h4 className="title">Coments</h4>
          <hr/>

          {this.props.comments.map((comment) => {

            //Precalculamos la hora
            let commentTimeStamp = 0
            if(typeof comment.timestamp === 'number') commentTimeStamp = comment.timestamp.toString().slice(0,-3)

            return (
              <article key={comment.id} className="media">
                <div className="media-left text-center">
                <h4 className="is-size-5" >{comment.voteScore}</h4>
                <p>{comment.voteScore === 1 ? "vote":"vote"}</p>
                </div>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong>{comment.author}</strong> <small><Moment format="MMM Do YY hh:mm" unix>{commentTimeStamp}</Moment></small>
                      <br/> {comment.body}
                    </p>
                  </div>
                </div>
                <div className="media-right">
                <a href="#" className="icon" onClick={() => this.props.votePosComment(comment.id)} ><i className="fa fa-thumbs-o-up"></i></a>
                <a href="#" className="icon" onClick={() => this.props.voteNegComment(comment.id)} ><i className="fa fa-thumbs-o-down"></i></a>
                <a href="#" className="icon" onClick={() => this.onCommentDeleteClick(comment.id)} ><i className="fa fa-pencil-square-o"></i></a>
                <a href="#" className="icon" onClick={() => this.onCommentDeleteClick(comment.id)} ><i className="fa fa-trash"></i></a>
                </div>
              </article>
            )
          })}

          <hr/>
          <article className="media">
            <div className="media-content">
              <form onSubmit={handleSubmit(this.onCommentSubmit)}>
              <div className="field">
                <p className="control is-4 column" style={{padding:0}}>
                  <Field className="input" type="text" name="author" placeholder="Author" type="text" component="input" />
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
  let tharr = state.posts.filter((pos)=>pos.id === ownProps.match.params.postid) //Viene de This ARRay
  if(tharr.length === 0) return {post:{}, comments:[]}
  else return {
    post:tharr[0],
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
  connect(mapStateToProps, {getPost, deletePost,votePosPost,voteNegPost, getComments, createComment, votePosComment, voteNegComment, editComment, deleteComment})(PostDetail)
)
