import React from 'react';
import Grid from './components/Grid.jsx';

import './styles/App.scss';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Grid />
      </div>
    );
  }
}
