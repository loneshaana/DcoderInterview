import React, { Component } from 'react';

import CreatableSelect from 'react-select/creatable';

export default class CreatableMulti extends Component {

  handleChange = (newValue, actionMeta) => {
    this.props.onChange(newValue);
  };

  render() {
    return (
      <CreatableSelect
        isMulti
        onChange={this.handleChange} />
    );
  }
}