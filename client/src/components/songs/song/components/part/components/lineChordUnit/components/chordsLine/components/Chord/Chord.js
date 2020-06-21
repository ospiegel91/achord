import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateChord, removeChord } from '../../../../../../../../../../../actions';
import styles from './css/chord.module.css'


class Chord extends Component {
    state = {inputWidth: this.props.chord.value ? this.props.chord.value.length + 4 : 4 }

    handleTyping = (e) => {
        var key = e.keyCode || e.charCode;
        if((key == 8 || key == 46) && e.target.value == ""){
            const values = {
                song: this.props.song._id, 
                part: this.props.partID, 
                line: this.props.line._id,
                chord: this.props.chord._id,
            }
            return this.props.removeChord(values);
        }
        if((key == 8 || key == 46) && this.state.inputWidth > 0){
            return this.setState({
                inputWidth: this.state.inputWidth - 1
            });
        } else if(4 < this.state.inputWidth < 13){
            return this.setState({
                inputWidth: this.state.inputWidth + 1
            });
        }
        alert('cant expand anymore');
    }

    handleUpdateChord = (e) => {
        const values = {
            song: this.props.song._id, 
            part: this.props.partID, 
            line: this.props.line._id,
            chord: this.props.chord._id,
            value: e.target.value
        }
        this.props.updateChord(values);
    }
    
    render(){
        const inputClasses = styles.chordInput + " browser-default";
        const defaultInputValue = this.props.chord.value ? this.props.chord.value : "";
        console.log('default value')
        console.log(defaultInputValue)
        return (
            <div 
                style={{left: this.props.left+'%', 
                        width: this.state.inputWidth+'ch'}} 
                        className={styles.chordBox}
            >
               <input style={{border: 'none'}} className="browser-default" onBlur={this.handleUpdateChord} onKeyDown={this.handleTyping} defaultValue={defaultInputValue} className={inputClasses} placeholder="chord" type="text"></input> 
            </div>
        )
    }
}

function mapStateToProps({song}){
    return { song };
}


export default connect(mapStateToProps, {updateChord, removeChord})(Chord);


