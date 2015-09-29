import React from 'react';
import Search from './components/search/search';
import PlayerWindow from './components/player-window/player-window';

class App extends React.Component {

  constructor() {
    super();
  }

  render() {
    return(
        <div>
            <Search />
            <PlayerWindow />
        </div>
    )
  }
}

export default App;
