import React, {Component} from 'react'
import Moment from 'react-moment'
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
                <p>
                  <strong>{this.props.post.author}</strong>. <FontAwesome name='clock-o' /> <Moment fromNow unix>{this.props.post.timestamp.toString().slice(0, -3)}</Moment>
                  <br />
                  {this.props.post.title}
                </p>
              </div>
              <nav className="level is-mobile">
                <div className="level-left">
                  <a className="level-item">
                    <span className="icon is-small"><i className="fa fa-reply"></i></span>
                  </a>
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
