import React, { Component } from 'react'
import {Route, NavLink, Switch} from 'react-router-dom'
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
                    <a className="nav-item">
                      <img src="/Readable-logo.svg" alt="Logo" />
                    </a>
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
            {/*
            <div className="hero-body">
              <div className="container has-text-centered">
                <h1 className="title">
                  Latest News
                </h1>
                <h2 className="subtitle">
                  All Categories
                </h2>
              </div>
            </div>
            */}
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
