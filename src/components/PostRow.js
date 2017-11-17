import React, {Component} from 'react'
import Moment from 'react-moment'
import {Link} from 'react-router-dom'

class PostRow extends Component {
  state = {
    isEditOpen: false,
    editTitle: this.props.post.title,
    editBody: this.props.post.body,
  }

  /* Acciones sobre el state y modal */

  onEditClick = () => {
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
    let id = this.props.post.id
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

  onPostDeleteClick = (postid) => {
    this.props.deletePost(postid, () => {})
  }

  render(){
    let {post} = this.props

    return (
      <div>
        <div className="box u-m-20">
          <article className="media">
            <div className="media-left text-center">
              <h3 className="is-size-4" >{post.voteScore}</h3>
              <p>votes</p>
            </div>
            <div className="media-content">
              <div className="content">
                <Link to={`/${post.category}/${post.id}`}>
                  <h4>{post.title}</h4>
                </Link>
              </div>
              <nav className="level is-mobile">
                <div className="level-left">
                  <span className="level-item"><i className="fa fa-clock-o"></i></span><span className="level-item"><Moment fromNow unix>{post.timestamp.toString().slice(0, -3)}</Moment></span><span className="level-item">by</span><span className="level-item"><strong>{post.author}</strong></span>
                  <a className="level-item" onClick={() => this.props.upvote(post.id)} >
                    <span className="icon is-small" ><i className="fa fa-thumbs-o-up"></i></span>
                  </a>
                  <a className="level-item"  onClick={() => this.props.downvote(post.id)}>
                    <span className="icon is-small" ><i className="fa fa-thumbs-o-down"></i></span>
                  </a>
                  <a className="level-item" onClick={() => this.onEditClick()}>
                    <span className="icon is-small"><i className="fa fa-pencil-square-o"></i></span>
                  </a>
                  <a className="level-item" onClick={() => this.onPostDeleteClick(post.id)}>
                    <span className="icon is-small"><i className="fa fa-trash"></i></span>
                  </a>
                </div>
              </nav>
            </div>
          </article>
        </div>
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
    )
  }
}

export default PostRow
