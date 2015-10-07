import React from 'react';
import Search from './components/search/search';
import PlayerWindow from './components/player-window/player-window';

window.WebSocket = window.WebSocket || window.MozWebSocket;
const serverAdress = '127.0.0.1:3000'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
        queue: [],
        currentTrack: null,
        playing: false,
        sessionId: null
    };
    this.addToQueue = this.addToQueue.bind(this);
    this.handlePlayAndPause = this.handlePlayAndPause.bind(this);
    this.onTrackEnd = this.onTrackEnd.bind(this);
    this.wsConnection = new WebSocket(`ws://${ serverAdress }`);
    this.wsConnection.onmessage = this.handleIncommingMessage.bind(this);
    this.getSessionIdOrInitState();
  }

  getSessionIdOrInitState(){
      let hash = window.location.hash;
      console.log('getSessionId', 'hash', hash);

      if( !hash ){
          this.createNewSession();
      }else {
          this.getSessionState(hash.split('#')[1]);
      }
  }

  getSessionState(sessionId){
      const self = this;
      console.log('fetching state from:', `http://${ serverAdress }/state/${ sessionId }`)
      fetch(`http://${ serverAdress }/state/${ sessionId }`)
      .then(response => response.json())
      .then(booty => {
          console.log('booty ---->>>', booty);
          self.setState(booty)
      });
  }

  createNewSession(){
      const self = this;
      fetch(`http://${ serverAdress }/id`)
      .then(response => response.json())
      .then(booty => {
          self.setState({
              sessionId: booty.session_id
          });
      });
  }

  handleIncommingMessage(msg){
      let message = JSON.parse(msg.data);
      switch (message.type) {
          case 'state':
              let state = JSON.parse(message.state)
              console.log('In comming state --->>', state)
              if(!_.isEqual(state.queue, this.state.queue)){
                  console.log('NOT THE SAME!!', [state.queue, this.state.queue]);
                  this.setState(state);
              }
              break;
          default:

      }
      console.log('Message received:', message );
  }

  evaluateMessageState(state){
      console.log('state -->', state);
  };

  addToQueue(track){
      let cue = this.state.queue;
      cue.push(track);
      this.setState({
          queue: cue
      });
      this.evaluateQueue();
      this.notifyServer();
  }

  notifyServer(){
      let state = JSON.stringify(this.state);
      console.info('notifyServer', state);
      this.wsConnection.send(JSON.stringify({
          state: state,
          type: 'state'
      }));
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
      this.notifyServer();
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
