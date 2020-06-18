import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchSongs, searchPublishedSongs } from '../../actions';
import styles from './css/songSearchBar.module.css';

class SongSearchBar extends Component {
    handleSearchBarValueChange = (e) => {
        if(this.props.published){
            return this.props.searchPublishedSongs(e.target.value);
        }
        return this.props.searchSongs(e.target.value);
    }

    render(){
        return (
            <div className={styles.container}>
                <h5 className={styles.searchText} htmlFor="search_bar">Search: </h5>
                <div className="s6">
                    <input 
                        onChange={this.handleSearchBarValueChange} 
                        placeholder="enter the name of your song to filter list" 
                        type="text" 
                        className="validate" 
                    />
                </div>
            </div>
        )
    }
}

export default connect(null, {searchSongs})(SongSearchBar, searchPublishedSongs);