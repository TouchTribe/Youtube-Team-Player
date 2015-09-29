import React from 'react';
import Queue from '../queue/queue'
import Player from '../player/player'

class PlayerWindow extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};
  }

  render() {
    return (
      <div className='player-window'>
        <Player />
        <Queue />
      </div>
    );
  }
}

export default PlayerWindow;
