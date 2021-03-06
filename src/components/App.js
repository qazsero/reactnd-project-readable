import React, { Component } from 'react'
import {Route, NavLink, Switch, Link} from 'react-router-dom'
import PostList from '../containers/PostList'
import PostAdd from '../containers/PostAdd'
import PostDetail from '../containers/PostDetail'
import 'bulma/css/bulma.css'
import '../App.css'

class App extends Component {

  render(){
    return(
      <div>
        <section className="hero is-info is-medium">
            <div className="hero-head">
              <header className="nav">
                <div className="container">
                  <div className="nav-left">
                    <Link to="/" className="nav-item">
                      <img src="/Readable-logo.svg" alt="Logo" />
                    </Link>
                  </div>
                  <span className="nav-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                  <div className="nav-right nav-menu">
                    <NavLink to="/" exact className="nav-item" activeClassName="is-active" >
                      Home
                    </NavLink>
                    <NavLink to="/post/add" className="nav-item" activeClassName="is-active" >
                      Add a Story
                    </NavLink>
                  </div>
                </div>
              </header>
            </div>
          </section>
          <div className="section">
            <div className="container">
              <Switch>
                <Route path="/" exact component={PostList} />
                <Route path="/category/:catPath" component={PostList} />
                <Route path="/post/add" component={PostAdd} />
                <Route path="/:category/:postid" component={PostDetail} />
              </Switch>
            </div>
          </div>
      </div>
    )
  }
}

export default App;
