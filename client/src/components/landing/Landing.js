import React, { Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './css/landing.module.css';

class Landing extends Component {
    renderDahsboardOrLogin(){
        const {auth} = this.props;
        if(auth){
            return (
                <div className="col-sm-6 col-xs-12">
                    <h6 className={styles.optionHeading}>Write/Edit/View a Song</h6>
                    <Link to="/songs" className="btn-floating btn-large blue">
                        <i className="material-icons">dashboard</i>
                    </Link>
                </div>
                
            )
        }
        return <h4>Please login with google using the top right button to write or view songs</h4>  
    }

    renderPublicLibVisit(){
        return(
            <div className="col-sm-6 col-xs-12">
                <h6 className={styles.optionHeading}>Public Songs Library</h6>
                <Link to="/songs/lib" className="btn-floating btn-large red">
                    <i className="material-icons">library_music</i>
                </Link>
            </div>
            
        )

    }
    render(){
        return (
            <div className={styles.container}>
                <h2 className={styles.welcomeText}>Welcome to Achord!</h2>
                <h5 className={styles.secondaryHeading}>chord writing and song playing made easy on the eye!</h5>
                <div className="row">
                    {this.renderDahsboardOrLogin()}
                    {this.renderPublicLibVisit()}
                </div>
            </div>
        );
    }
};


function mapStateToProps({auth}){
    return { auth };
}
export default connect(mapStateToProps)(Landing);