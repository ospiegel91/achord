import React, { Component } from 'react';

class SongPartFormReview extends Component {
    render(){
        return(
            <div>
                {this.props.lyrics.map((line, i) => <span key={i}>{line}</span>)}
            </div>
        )
    }
}

export default SongPartFormReview;