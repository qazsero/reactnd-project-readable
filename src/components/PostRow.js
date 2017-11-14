import React, {Component} from 'react'
import Moment from 'react-moment'
import {Link} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'

class PostRow extends Component {

  render(){
    return (
      <div>
        <div className="box u-m-20">
          <article className="media">
            <div className="media-left text-center">
              <h3 className="is-size-4" >{this.props.post.voteScore}</h3>
              <p>votes</p>
            </div>
            <div className="media-content">
              <div className="content">
                <Link to={`/post/${this.props.post.id}`}>
                  <h4>{this.props.post.title}</h4>
                </Link>
              </div>
              <nav className="level is-mobile">
                <div className="level-left">
                  <span className="level-item"><FontAwesome name='clock-o' /></span><span className="level-item"><Moment fromNow unix>{this.props.post.timestamp.toString().slice(0, -3)}</Moment></span><span className="level-item">by</span><span className="level-item"><strong>{this.props.post.author}</strong></span>
                  <a className="level-item">
                    <span className="icon is-small" onClick={() => this.props.upvote(this.props.post.id)} ><FontAwesome name='thumbs-o-up' /></span>
                  </a>
                  <a className="level-item">
                    <span className="icon is-small" onClick={() => this.props.downvote(this.props.post.id)} ><FontAwesome name='thumbs-o-down' /></span>
                  </a>
                </div>
              </nav>
            </div>
          </article>
        </div>
      </div>
    )
  }
}

export default PostRow
