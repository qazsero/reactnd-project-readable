import React, {Component} from 'react'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import {getPost, deletePost,votePosPost,voteNegPost} from '../actions'

class PostDetail extends Component {

  componentDidMount(){
    let postid = this.props.match.params.postid
    this.props.getPost(postid)
  }

  onDeleteClick() {
    const {postid} = this.props.match.params
    this.props.deletePost(postid, () => {
      this.props.history.push('/')
    })
  }

  render(){

    var formatedTimeStamp = 0
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
              <div className="column is-1 text-center">
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
              <a href="#">@{this.props.post.author} </a>
            </p>
            <p className="card-footer-item">
              <Moment format="MMM Do YY hh:mm" unix>{formatedTimeStamp}</Moment>
            </p>
            <Link to="/" className="card-footer-item">Edit</Link>
            <a onClick={this.onDeleteClick.bind(this)} className="card-footer-item is-danger">Delete</a>
          </footer>
        </div>

        <section className="section" id="media">
          <h4 className="title">Coments</h4>
          <hr/>
          <article className="media">
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                  <br/> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                </p>
              </div>
            </div>
          </article>
          <hr/>
          <article className="media">
            <div className="media-content">
              <div className="field">
                <p className="control">
                  <textarea className="textarea" placeholder="Add a comment..."></textarea>
                </p>
              </div>
              <nav className="level">
                <div className="level-left">
                  <div className="level-item">
                    <a className="button is-info">Post comment</a>
                  </div>
                </div>
              </nav>
            </div>
          </article>
        </section>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  let tharr = state.posts.filter((pos)=>pos.id==ownProps.match.params.postid) //Viene de This ARRay
  if(tharr.length == 0) return {post:{}}
  else return {post:tharr[0]}
}

export default connect(mapStateToProps, {getPost, deletePost,votePosPost,voteNegPost})(PostDetail)
