import React from 'react';
import Welcome from './components/welcome/welcome';
import Search from './components/search/search';

class App extends React.Component {

  constructor() {
    super();
  }

  render() {
    return(
        <div>
            <Welcome/>
            <Search />
        </div>
    )
  }
}

export default App;
