import React, { Component } from 'react';
import { connect } from 'react-redux';
import { insertChord } from '../../../../../../../../../actions';
import styles from './css/chordLine.module.css'
import Chord from './components/Chord/Chord';


class ChordsLine extends Component {
    constructor(props) {
        super(props);
        this.chordContainer = React.createRef();
      }

    handleInsertChord = async (e) => {
        if(e.target.nodeName == "INPUT"){
            console.log('exit!')
            return;
        }
        const distance = e.clientX - this.chordContainer.current.offsetLeft;
        const percentLeft = Math.round((distance/this.chordContainer.current.clientWidth)*100);
        const values = {
            song: this.props.song._id, 
            part: this.props.partID, 
            line: this.props.line._id,
            location: percentLeft,
        };
        this.props.insertChord(values);
    }

    renderChords(){
        return this.props.line.chords.map((chord, i) => <Chord key={chord.value+i} partID={this.props.partID} line={this.props.line} chord={chord} left={chord.location}></Chord>)
    }
    render(){
        const chordsContainerClass = this.props.inPlay == true ? styles.chordsContainerPlay : styles.chordsContainer; 
        return (
            <div ref={this.chordContainer} onClick={this.handleInsertChord} className={chordsContainerClass}>
                {this.renderChords()}
            </div>
        )
    }
}


function mapStateToProps({song}){
    return { song };
}


export default connect(mapStateToProps, {insertChord})(ChordsLine);

