import React, { Component } from 'react';
import { render } from 'react-dom';
import Select from './Select';

class ReduxFormSelect extends Component {
    render(){
        const { input, options } = this.props;
        return (
            <Select 
              {...input} 
              onChange={value => input.onChange(value)} 
              onBlur={() => input.onBlur(input.value)} 
              options={options}
            />
          )

    }

  }

  export default ReduxFormSelect;