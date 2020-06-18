import React, { Component } from 'react';
import {reduxForm} from 'redux-form';
import SongForm from './songForm/SongForm';
import SongFormReview from './SongFormReview';


class SongNew extends Component {
    state = {showFormReview: false}


    renderContent(){
        if(this.state.showFormReview){
            return <SongFormReview onCancel={this.handleCancel}/>
        };
        return <SongForm onSongSubmit={this.handleSubmit}/>
    }

    handleSubmit = () => {
        this.setState({
            showFormReview: true
        });
    }
    handleCancel = () => {
        this.setState({
            showFormReview: false
        });
    }

    render(){
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    };
};

export default reduxForm({
    form: 'songForm'
})(SongNew);