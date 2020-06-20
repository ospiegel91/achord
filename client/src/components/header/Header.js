import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './css/header.module.css';


class Header extends Component {
    renderContent(){
        switch (this.props.auth){
            case null:
                return;
            case false:
                return <div><a className={styles.googleAuthButton} href="/auth/google">Login with Google</a></div>;
            default:
                return <div><a className={styles.googleAuthButton} href="/api/logout">Logout</a></div>;
        }
    }

    render(){
        return (
            <div className={styles.navContainer}>
                    <div>
                        <Link style={{color: 'white'}}
                            to={this.props.auth ? '/songs' : '/'} 
                        >
                            Achord
                        </Link>
                    </div>
                    <div >
                        {this.renderContent()}
                    </div>
            </div>
        );
    };
};

function mapStateToProps({auth}){
    return { auth };
}
export default connect(mapStateToProps)(Header);