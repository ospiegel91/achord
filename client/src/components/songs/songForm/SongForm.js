import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SongTitleField from '../SongTitleField';
import ReduxFormSelect from '../ReduxFormSelect';
import { Link } from 'react-router-dom';
import styles from './css/songForm.module.css';


class SongForm extends Component {
    state = {
        dirOptions : [
            {
              label: 'Left-To-Right',
              value: 'ltr',
            },
            {
              label: 'Right-To_Left',
              value: 'rtl',
            }
        ],
        direction: 'ltr'
    }
    handleSelectDirectionChange = () => {
        console.log('handleSelectDirectionChange')
        if(this.state.direction == 'ltr'){
            return this.setState({
                direction: 'rtl'
            })
        }
        return this.setState({direction: 'ltr'})
    }
    renderFields(){
        return (
            <div>
                <div className="center switch">
                    <label>
                    left-to-right
                    <input type="checkbox" onChange={this.handleSelectDirectionChange}/>
                    <span class="lever"></span>
                    right-to-left
                    </label>
                </div>
                <Field key="songTitleField" label="Song Title" type="text" name="title" component={SongTitleField} dir={this.state.direction}></Field>
                <Field
                    key="songLyricsField"
                    placeholder="paste lyrics here, leave one empty line between song parts" 
                    name="lyrics" 
                    component="textarea"
                    className={styles.lyricsField}
                    dir={this.state.direction}>
                </Field>
                <Field key="songDirectionField" name="direction" component={ReduxFormSelect} options={this.state.dirOptions} />
            </div>
        );
    }
    render(){
        return (
            <div className={styles.container}>
                <form onSubmit={this.props.handleSubmit(this.props.onSongSubmit)}>
                    {this.renderFields()}
                    <Link to="/songs" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button className="teal btn-flat right white-text" type="submit">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    };
};
function validate(values){
    const errors = {};
    console.log(values)
    if (!values.title){
        errors.title = "You must provide a title";
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'songForm',
    destroyOnUnmount: false
})(SongForm);