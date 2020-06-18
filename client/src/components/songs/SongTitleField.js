import React, { Component } from 'react';

class SongTitleField extends Component {
    render(){
        const {input, label, meta, dir} = this.props; 
        const {error, touched} = meta;
        return(
            <div dir={dir}>
                <label>{label}</label>
                <input style={{marginBottom: '5px'}} {...input}/>
                <div style={{marginBottom: '20px'}} className="red-text">
                    {touched && error}
                </div>
                
            </div>
        )
    }
}

export default SongTitleField;