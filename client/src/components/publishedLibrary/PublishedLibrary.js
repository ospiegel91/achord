import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import SongList from '../songs/songList/SongList';
import SongSearchBar from '../songSearchBar/SongSearchBar';

class PublishedLibrary extends Component {
    render(){
        return (
            <div>
                <SongSearchBar published={true} />
                <SongList published={true} />
            </div>
        );
    }   
};

export default connect(null, actions)(PublishedLibrary);