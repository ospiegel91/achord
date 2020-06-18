import React, { Component } from 'react';
import { connect } from 'react-redux';
import LineChordUnit from './components/lineChordUnit/LineChordUnit';
import styles from './css/part.module.css';

class Part extends Component {
    renderPartLines(){
        return this.props.part.lyrics.map((line, i) => <LineChordUnit
                                                            inPlay={this.props.inPlay} 
                                                            insertPosition={i + 1} 
                                                            partID={this.props.part._id} 
                                                            key={i} 
                                                            line={line}>
                                                        </LineChordUnit>);
    }

    render(){
        const display = this.props.display ? 'block' : 'none'
        return (
            <div style={{display: display}} className="col-sm-6 col-xs-12" >
                <p style={{marginBottom: '0.3%'}}>part</p>
                <div>
                    {this.renderPartLines()}
                </div>
            </div>
        )
    }
}

export default connect(null, null)(Part);