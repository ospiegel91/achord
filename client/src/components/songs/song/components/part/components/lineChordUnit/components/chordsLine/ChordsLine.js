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
        console.log(this.chordContainer.current)
        console.log(this.chordContainer.current.getBoundingClientRect())
        const left = e.clientX - this.chordContainer.current.getBoundingClientRect().left;

        console.log(left)
        const values = {
            song: this.props.song._id, 
            part: this.props.partID, 
            line: this.props.line._id,
            location: left,
        };
        console.log(values);
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

