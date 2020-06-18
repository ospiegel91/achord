import React, { Component } from 'react';

class Select extends Component {
    render(){
        const props = this.props;
        console.log(props.options)
        console.log('name')
        console.log(props.name)
        return(
            <div className="form-group">
                <label htmlFor={props.name}> {props.title} </label>
                <select
                    onChange={props.onChange}
                    style={{display: 'block',}}
                    name={props.name}
                  >
                  <option value="" disabled>{props.placeholder}</option>
                  {props.options.map(option => {
                    return (
                      <option
                        key={option.label}
                        value={option.value}
                        label={option.label}>{option.label}
                      </option>
                    );
                  })}
                </select>
          </div>)

    }

  }

  export default Select;