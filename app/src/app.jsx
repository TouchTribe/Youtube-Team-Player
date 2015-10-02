import React from 'react';
import Search from './components/search/search';
import PlayerWindow from './components/player-window/player-window';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
        queue: [
            { name:'Some awesome track', artist: 'Some guy' },
            { name:'Some awesome track', artist: 'Some other guy' },
            { name:'Some awesome track', artist: 'Some other other guy' },
            { name:'Some awesome track', artist: 'Some other other other guy' },
            { name:'Some awesome track', artist: 'Some another other guy' },
            { name:'Some awesome track', artist: 'Other some guy' },
            { name:'Some awesome track', artist: 'Some guy' },
            { name:'Some awesome track', artist: 'Some guy' },
            { name:'Some awesome track', artist: 'Other some guy' },
            { name:'Some awesome track', artist: 'Some guy' },
            { name:'Some awesome track', artist: 'Some guy' },
            { name:'Some awesome track', artist: 'Some other other other guy' },
            { name:'Some awesome track', artist: 'Some guy' },
            { name:'Some awesome track', artist: 'Some other other other guy' },
            { name:'Some awesome track', artist: 'Some guy' }
        ]
    };
  }

  render() {
    return(
        <div>
            <Search />
            <PlayerWindow queue={ this.state.queue } />
        </div>
    )
  }
}

export default App;
