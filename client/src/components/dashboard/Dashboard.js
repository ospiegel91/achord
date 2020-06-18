import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import SongList from '../songs/songList/SongList';
import SongSearchBar from '../songSearchBar/SongSearchBar';

class Dashboard extends Component {
    render(){
        return (
            <div>
                <SongSearchBar published={false}/>
                <SongList published={false}/>
                <div className="fixed-action-btn">
                    <Link to="/songs/new" className="btn-floating btn-large red">
                        <i className="material-icons">add</i>
                    </Link>
                </div>
            </div>
        );
    }   
};

export default connect(null, actions)(Dashboard);