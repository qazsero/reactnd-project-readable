import React, {Component} from 'react'
import Moment from 'react-moment'

class PostComment extends Component {
  state = {
    isEditOpen:false,
    edittedComment: this.props.comment.body,
  }

  formatTime = () =>{
    //Precalculamos la hora
    let commentTimeStamp = 0
    if(typeof this.props.comment.timestamp === 'number') commentTimeStamp = this.props.comment.timestamp.toString().slice(0,-3)
    return(
      <Moment format="MMM Do YY hh:mm" unix>{commentTimeStamp}</Moment>
    )
  }

  onCommentEditClick = () => {
    this.setState({isEditOpen:true})
  }

  handleEditComment = (event) => {
    this.setState({edittedComment: event.target.value})
  }

  updateComment = () => {
    let values = {}
    let id = this.props.comment.id
    values.timestamp = Date.now()
    values.body = this.state.edittedComment
    this.props.updateComment(id, values)
    this.closeEditModal()
  }

  closeEditModal = () => {
    this.setState({isEditOpen:false})
  }

  modalClass = () => {
    let openModal = this.state.isEditOpen ? 'is-active' : ''
    return `modal ${openModal}`
  }


  render(){

    let {comment} = this.props

    return (
      <article className="media">
        <div className="media-left text-center">
        <h4 className="is-size-5" >{comment.voteScore}</h4>
        <p>{comment.voteScore === 1 ? "vote":"vote"}</p>
        </div>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{comment.author}</strong> <small>{this.formatTime()}</small>
              <br/> {comment.body}
            </p>
          </div>
          <nav className="level">
            <div className="level-left">
              <a className="level-item" onClick={() => this.props.votePosComment(comment.id)} >
                <span className="icon is-small"><i className="fa fa-thumbs-o-up"></i></span>
              </a>
              <a className="level-item" onClick={() => this.props.voteNegComment(comment.id)}>
                <span className="icon is-small"><i className="fa fa-thumbs-o-down"></i></span>
              </a>
              <a className="level-item" onClick={() => this.onCommentEditClick(comment.id)}>
                <span className="icon is-small"><i className="fa fa-pencil-square-o"></i></span>
              </a>
              <a className="level-item" onClick={() => this.props.deleteComment(comment.id)}>
                <span className="icon is-small"><i className="fa fa-trash"></i></span>
              </a>
            </div>
          </nav>
        </div>
        <div className={this.modalClass()}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Edit Comment</p>
              <button onClick={() => this.closeEditModal()}  className="delete" aria-label="close"></button>
            </header>
            <section className="modal-card-body">
              <textarea className="textarea" onChange={this.handleEditComment} value={this.state.edittedComment}></textarea>
            </section>
            <footer className="modal-card-foot">
              <button onClick={() => this.updateComment()} className="button is-success">Save changes</button>
              <button onClick={() => this.closeEditModal()}  className="button">Cancel</button>
            </footer>
          </div>
        </div>
      </article>
    )
  }
}

export default PostComment
