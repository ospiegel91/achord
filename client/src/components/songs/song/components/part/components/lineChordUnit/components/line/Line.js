import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateLine } from '../../../../../../../../../actions';
import styles from './css/line.module.css'; 

class Line extends Component {
    handleLineWordsChange = async (e) => {
        const values = {
            song: this.props.song._id, 
            part: this.props.partID, 
            line: this.props.line._id,
            text: e.target.value
        }
        this.props.updateLine(values);
    }


    render(){
        const { line } = this.props;
        const inputClass = styles.inputLine + " browser-default"
        return (
            <input className={inputClass} onBlur={this.handleLineWordsChange} type="text" key={line._id} defaultValue={line.words}></input>
        )
    }
}


function mapStateToProps({song}){
    return { song };
}


export default connect(mapStateToProps, {updateLine})(Line);

