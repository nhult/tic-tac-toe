import React from 'react';
import '../styles/Cell.scss';

export default class Cell extends React.Component {
  render() {
    return (
      <div className="Cell" onClick={() => this.props.clickHandler()}>{ this.props.mark }</div>
    );
  }
}
