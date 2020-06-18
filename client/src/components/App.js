import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from "./header/Header";
import Landing from "./landing/Landing";
import Dashboard from "./dashboard/Dashboard";
import SongNew from "./songs/SongNew";
import Song from "./songs/song/Song";
import PublishedLibrary from "./publishedLibrary/PublishedLibrary";

class App extends Component {
  componentDidMount(){
    this.props.fetchUser();
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/songs" component={Dashboard} />
            <Route path="/songs/lib" component={PublishedLibrary} />
            <Route path="/songs/new" component={SongNew} />
            <Route path="/songs/song/:id" component={Song} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
