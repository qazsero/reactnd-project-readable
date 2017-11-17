import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PostRow from '../components/PostRow'
import * as actions from '../actions'

class PostList extends Component {

  componentDidMount(){
    this.props.getPosts()
    if(this.props.categories.length === 0){this.props.getCategories()}
  }

  render(){
    console.log(this.props.posts)
    let orderedPostList //La lista final filtrada y ordenada

    //Alimentamos el objeto con el estado y filtramos por eliminados
    orderedPostList = this.props.posts.filter((p) => p.deleted !== true)

    if(this.props.postOrder) {
      switch (this.props.postOrder) {
        case 'votes':
          orderedPostList.sort(
            function(a, b){
                return b.voteScore - a.voteScore
            })
          break;
        case 'dateAsc':
          orderedPostList.sort(
            function(a, b){
              return b.timestamp - a.timestamp
            })
          break
        case 'dateDesc':
          orderedPostList.sort(
            function(a, b){
              return a.timestamp - b.timestamp
            })
          break
        default:
          return false
      }
    }

    if(this.props.match.params.catPath) {
      orderedPostList = orderedPostList.filter((p) => p.category === this.props.match.params.catPath)
    }

    return (
      <div>

              <div className="column is-10 is-offset-1">
                <div className="columns">
                  <div className="column is-8">
                    <div className="event-timeline">

                      {/* La lista de seleccion ordenar por */}
                      <div className="field is-horizontal">
                        <div className="field-label is-normal">
                          <label className="label">Sort by: </label>
                        </div>
                        <div className="field-body">
                          <div className="field">
                            <div className="control">
                              <div className="select">
                                <select value={this.props.postOrder} onChange={(event) => this.props.setPostOrder(event.target.value)} >
                                  <option value="votes" >Votes</option>
                                  <option value="dateAsc">Latest first</option>
                                  <option value="dateDesc">Oldest first</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Lista de Posts */}
                      {orderedPostList.map((post, index) => (<PostRow
                                                                key={index}
                                                                post={post}
                                                                upvote={this.props.votePosPost}
                                                                downvote={this.props.voteNegPost}
                                                                editPost={this.props.editPost}
                                                                deletePost={this.props.deletePost}
                                                              />
                      ))}

                    </div>
                  </div>
                  <div className="column is-4">
                    <nav className="panel">
                      <p className="panel-heading">
                        Categories
                      </p>
                      <Link className="panel-block is-active" to="/">
                        <span className="panel-icon">
                          <i className="fa fa-book"></i>
                        </span>
                        All
                      </Link>
                      {this.props.categories.map((cats) => (
                        <Link key={cats.path} className="panel-block is-active" to={`/category/${cats.path}`}>
                          <span className="panel-icon">
                            <i className="fa fa-book"></i>
                          </span>
                          {cats.name}
                        </Link>
                      ))}

                    </nav>
                  </div>
                </div>
              </div>
      </div>
    )
  }

}

function mapStateToProps(state){
  return {
    posts: state.posts,
    categories: state.categories,
    postOrder: state.postOrder
  }
}

//La diferencia entre contenedores y componentes es que
//contenedores son componentes conectados con redux
export default connect(mapStateToProps, actions)(PostList)
