import React from 'react';
import Search from './components/search/search';
import PlayerWindow from './components/player-window/player-window';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
        queue: [],
        currentTrack: null,
        playing: false
    };
    this.addToQueue = this.addToQueue.bind(this);
    this.handlePlayAndPause = this.handlePlayAndPause.bind(this);
    this.onTrackEnd = this.onTrackEnd.bind(this);
  }

  addToQueue(track){
      let cue = this.state.queue;
      cue.push(track);
      this.setState({
          queue: cue
      });
      this.evaluateQueue();
  }

  evaluateQueue(){
      if( this.state.queue.length <= 1 && this.state.currentTrack === null ){
          this.setState({
              currentTrack: this.state.queue[0]
          });
          this.state.queue.shift();
      }
  }

  handlePlayAndPause(state){
      console.log('playing', state)
  }

  onTrackEnd(event){
      console.log('onTrackEnd', event.target);
      window.ditHier = event.target;
      this.playNextTrack(event.target);
  }

  playNextTrack(target){
      let cue = this.state.queue;
      let nextTrack = cue[0];
      target.loadVideoById(nextTrack.id.videoId);
      cue.shift();
      this.setState({
          currentTrack: nextTrack,
          queue: cue
      });
  }

  render() {
    return(
        <div>
            <Search onSelect={ this.addToQueue } />
            <PlayerWindow queue={ this.state.queue }
                          currentTrack={ this.state.currentTrack }
                          handlePlayAndPause={ this.handlePlayAndPause }
                          onTrackEnd={ this.onTrackEnd }/>
        </div>
    )
  }
}

export default App;
