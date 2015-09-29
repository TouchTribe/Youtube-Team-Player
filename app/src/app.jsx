import React from 'react';
import Welcome from './components/welcome/welcome';
import Welcome from './components/search/search';

class App extends React.Component {

  constructor() {
    super();
  }

  render() {
    return(
      <Welcome/>
      <Search/>
    )
  }
}

export default App;
