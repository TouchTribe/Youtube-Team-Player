import React from 'react';
import { Client, TrackHandler } from 'spotify-sdk';

class Player extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
        playing: false,
        currentTrack: false
    };
    this.playTrack = this.playTrack.bind(this);
    this.pauseTrack = this.pauseTrack.bind(this);
    this.handlePlayAndPause = this.handlePlayAndPause.bind(this);
    this.track = new TrackHandler();
  }

  playTrack(){
      const self = this;
      this.track.get(this.props.track).then((TrackEntity) => {
          self.audioObject = new Audio(TrackEntity.preview_url);

          self.audioObject.play();
          self.setState({playing: true, currentTrack: TrackEntity});
          console.log(TrackEntity);
      });
  }

  pauseTrack(){
      this.audioObject.pause();
      this.setState({playing: false});
  }

  handlePlayAndPause(){
      if( this.state.playing ){
          this.pauseTrack();
      }else {
          this.playTrack();
      }
  }

  render() {
      let playLabel = this.state.playing ? '||' : '>';
      let background = this.state.currentTrack ? this.state.currentTrack._album.images[0] : 'http://lorempixel.com/400/400/cats';
    return (
        <div className='player' style={{'background-image':`url(${background})`}}>
            <div className='player__controlls'>
                <div className='player__controlls-play' data-playing={ this.state.playing } onClick={ this.handlePlayAndPause }>{playLabel}</div>
            </div>
        </div>
    );
  }
}

export default Player;
