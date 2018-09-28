import React from 'react';

/** The prompt content component */
class Prompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue
    };
    this.onChange = (e) => this._onChange(e);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.value !== this.state.value) {
      this.props.onChange(this.state.value);
    }
  }

  _onChange(e) {
    let value = e.target.value;
    this.setState({value: value});
  }

  render() {
    return <input type="text" placeholder={this.props.placeholder} className="mm-popup__input" value={this.state.value}
                  onChange={this.onChange}/>;
  }
}

export default Prompt;