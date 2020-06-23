import React, { Component } from 'react';
import { connect } from 'react-redux';
import Line from './components/line/Line';
import { addLine, emptyChords, changeDirection, pasteChords } from '../../../../../../../actions';
import styles from './css/lineChordUnit.module.css';
import ChordsLine from './components/chordsLine/ChordsLine.js';

class LineChordUnit extends Component {
    state = {
        lineMenuDisplay: 'none',
        moreButtonDisplay: 'block'
    }
    handleAddLineUnit = async () => {
        console.log('handle add line unit');
        const values = {
            song: this.props.song._id, 
            part: this.props.partID, 
            position: this.props.insertPosition,
        };
        this.props.addLine(values);

    }

    handleChangeDirection = async () => {
        console.log('handle change direction');
        const values = {
            song: this.props.song._id, 
            part: this.props.partID, 
            line: this.props.line._id,
        };
        this.props.changeDirection(values);

    }

    handleEmptyChords = async () => {
        console.log('handle empty chords');
        const values = {
            song: this.props.song._id, 
            part: this.props.partID, 
            line: this.props.line._id,
        };
        this.props.emptyChords(values);

    }

    handleCopyChords = async () => {
        localStorage.setItem('data',JSON.stringify(this.props.line))
        alert(JSON.stringify(this.props.line.chords))
    }

    handlePasteChords = async () => {
        const data = localStorage.getItem('data');
        const values = {
            chords: data,
            song: this.props.song._id, 
            part: this.props.partID, 
            line: this.props.line._id,
        };
        this.props.pasteChords(values);

    }

    handleLineMenuExpand = () => {
        return this.setState({
                lineMenuDisplay: 'block',
                moreButtonDisplay: 'none'
        })
    }

    handleLineMenuExit = () => {
        return this.setState({
            lineMenuDisplay: 'none',
            moreButtonDisplay: 'block'
        })
    }

    handleOptionSelected = (e) => {
        const selected = e.target.value;
        e.target.selectedIndex = 0;
        switch(selected){
            case "addLine":
                return this.handleAddLineUnit();
            case "emptyChords":
                return this.handleEmptyChords();
            case "copyChords":
                return this.handleCopyChords();
            case "pasteChords":
                return this.handlePasteChords();
            case "changeDirection":
                return this.handleChangeDirection();
        }
    }

    pasteButton(){
        const pasteDisplay = localStorage.getItem('data') ? 'block' : 'none';
        return(<option value="pasteChords" style={{display: pasteDisplay}}>
        paste chords
        </option>)

    }
    render(){
        const optionsContainerDisplay = this.props.inPlay ? "none" : "block";
        const directionOption = this.props.line.direction == "rtl" ? "ltr" : "rtl";
        return (
            <div dir={this.props.line.direction} className={styles.container}>
                <div className={styles.chordsContainer}>
                    <ChordsLine inPlay={this.props.inPlay} partID={this.props.partID} line={this.props.line}></ChordsLine>
                    <Line inPlay={this.props.inPlay} partID={this.props.partID} line={this.props.line}></Line>
                </div>
                <div style={{display: optionsContainerDisplay}} className={styles.optionsContainer}>
                    <select className={styles.optionsContainerSelect} onChange={this.handleOptionSelected} style={{display: 'block'}} >
                        <option >
                        </option>
                        <option value="changeDirection" >
                                {directionOption}
                        </option>
                        <option value="copyChords">
                                copy chords
                        </option>
                        {this.pasteButton()}
                        <option value="emptyChords" >
                                wipe chords
                        </option>
                        <option value="addLine" >
                                add line
                        </option>
                    </select>
                </div>
            </div>
            
        )
    }
}

function mapStateToProps({song}){
    return { song };
}

export default connect(mapStateToProps, {addLine, emptyChords, changeDirection, pasteChords})(LineChordUnit);