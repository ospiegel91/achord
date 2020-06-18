import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SongPartFormReview from './SongPartFormReview';
import * as actions from '../../actions';

class SongFormReview extends Component {
    renderLyrics(){
        return this.props.formLyrics.map((part, i) => <SongPartFormReview lyrics={part} key={i}/>);
    }
    render(){
        const {formTitle, formDirection, formLyrics, createSong, history} = this.props;
        console.log('form direction')
        console.log(formDirection)
        return (
            <div>
                <h1>{formTitle}</h1>
                {this.renderLyrics()}
                <button
                    className="orange white-text btn-flat"
                    onClick={this.props.onCancel}
                >Back
                </button>
                <button onClick={() => createSong({formTitle, formDirection, formLyrics, history})} className="green white-text btn-flat right">
                    Initialize Song
                    <i className="material-icons white-text right">music_note</i>
                </button>
            </div>
        );
    };
};

function mapStateToProps(state){
    const lines = state.form.songForm.values.lyrics.split("\n")
    const parts = [];
    let part = [];
    for (let line of lines){
        if(line == ""){
            parts.push(part);
            part = [];
        }else{
            part.push(line)
        }
    };
    if (part){
        parts.push(part);
    };
    return {
        formTitle: state.form.songForm.values.title,
        formDirection: state.form.songForm.values.direction,
        formLyrics: parts
    };
}
export default connect(mapStateToProps, actions)(withRouter(SongFormReview));