import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSong, publishSong, shiftSong } from '../../../actions';
import Part from './components/part/Part';
import styles from './css/song.module.css';

class Song extends Component {
    state = {
        timePerPart: 45,
        partDisplayArr: [0,1],
        inPlay: false,
        slideShow: null
    }
    componentDidMount(){
        const songID = this.props.match.params.id;
        this.props.fetchSong(songID);
    }

    renderSongParts(){
        const partDisplayArr = this.state.partDisplayArr;
        if(this.props.song.parts){
            return this.props.song.parts.map((part, i) => 
            (partDisplayArr[0] == i || partDisplayArr[1] == i) ? 
            <Part inPlay={this.state.inPlay} display={true} part={part} key={i}></Part> :  
            <Part display={false} part={part} key={i}></Part> );
        }
        return;
    }

    setDisplayState = () =>{
        this.setState({
            partDisplayArr: [this.state.partDisplayArr[0]+1,
                            this.state.partDisplayArr[1]+1]
        })
    }

    setDisplayStatePrev = () =>{
        this.setState({
            partDisplayArr: [this.state.partDisplayArr[0]-1,
                            this.state.partDisplayArr[1]-1]
        })
    }

    handlePlaySong = () => {
            return this.setState({
                slideShow: setInterval(this.setDisplayState, this.state.timePerPart*1000),
                inPlay: true
            });
    }

    handleStopSong = () => {
        clearInterval(this.state.slideShow);
        return this.setState({
            partDisplayArr: [0,1],
            inPlay: false,
            slideShow: null
        });
    }

    setTimer = (e) => {
        return this.setState({
            timePerPart: e.target.value
        })
    }
    handlePublish = () => {
        const songID = this.props.match.params.id;
        this.props.publishSong(songID);
    }
    handleShift = () => {
        const songID = this.props.match.params.id;
        this.props.shiftSong(songID);
    }

    renderPlayStopButtons(){
        if(this.state.inPlay){
            return (
                <button onClick={this.handleStopSong} className="red white-text btn text-center">
                    <i className="material-icons white-text right">stop_circle</i>
                </button>
            )
        }
        return (
            <button style={{textAlign: "center"}} onClick={this.handlePlaySong} className="green white-text btn">
                <i className="material-icons white-text right">play_circle_filled</i>
            </button>
        )
    }

    render(){
        const {song} = this.props;
        return (
            <div className={styles.songContainer} dir={song.direction}>
                <div className={styles.toolBarContainer}>
                    <h4 className={styles.songHeading}>{song.name}</h4>
                    <div>
                        <div className={styles.symbolContainer}>
                            <button className={styles.slideButton} onClick={this.setDisplayStatePrev}>
                                <i className="material-icons">skip_previous</i>
                            </button>
                            <button className={styles.slideButton} onClick={this.setDisplayState}>
                                <i className="material-icons">skip_next</i>
                            </button>
                            <button className={styles.slideButton} onClick={this.handlePublish}>
                                <i class="material-icons">public</i>
                            </button>
                            <button className={styles.slideButton} onClick={this.handleShift}>
                                <i class="material-icons">music_note</i>+
                            </button>
                        </div>
                    </div>
                    <div className={styles.copyTools}>
                        <h7 className={styles.symbolsMenuHeading}>Click to Copy</h7>
                        <div className={styles.symbolContainer}>
                            <button className={styles.symbolButton} onClick={() => {navigator.clipboard.writeText("ø")}}>ø</button>
                            <button className={styles.symbolButton} onClick={() => {navigator.clipboard.writeText("o")}}>o</button>
                            <button className={styles.symbolButton} onClick={() => {navigator.clipboard.writeText("Δ")}}>Δ</button>
                        </div>
                    </div>
                    <div className={styles.playOptionsContainer}>
                        <fieldset>
                            <label for="timer">Time per part:</label>
                            <input 
                                name="timer" 
                                max="100" 
                                min="5" 
                                step="1"
                                onChange={this.setTimer} 
                                type="range" defaultValue={this.state.timePerPart}></input>
                            <em>{this.state.timePerPart} seconds</em>
                        </fieldset>
                        {this.renderPlayStopButtons()}
                    </div>

                </div>
                <div>
                    <div className="row">
                        {this.renderSongParts()}
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps({song}){
    return { song };
}

export default connect(mapStateToProps, {fetchSong, publishSong, shiftSong})(Song);