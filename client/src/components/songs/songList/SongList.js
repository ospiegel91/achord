import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSongs, fetchPublishedSongs } from '../../../actions';
import styles from './css/songList.module.css';
import { Link } from 'react-router-dom';

class SongList extends Component {
    componentDidMount(){
        if(this.props.published){
            return this.props.fetchPublishedSongs();
        }
        this.props.fetchSongs();
    }
    renderSongs(){
        return this.props.songs.map(song=>{
            const address = "/songs/song/" + song._id
            return (
                <Link key={song._id} to={address}>
                    <div className="card darken-1" key={song._id}>
                        <div className="card-content">
                            <span className="card-title">{song.name}</span>
                            <p className="right">
                                Last Saved On: {new Date(song.dateLastSaved).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </Link>

            )
        })
    }
    render(){
        return (
            <div className={styles.songsContainer}>
                {this.renderSongs()}
            </div>
        )
    }
}

function mapStateToProps({songs}){
    return { songs };
}

export default connect(mapStateToProps, {fetchSongs, fetchPublishedSongs})(SongList);