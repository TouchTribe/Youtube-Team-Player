import React from 'react';
import YouTube from 'react-youtube';

class Player extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
        currentTrack: null
    };

    this.opts = {
        height: '400',
        width: '400',
        playerVars: {
            autoplay: 1
        }
    };
  }

  render() {
      if( this.props.currentTrack ){
          let sourceId = this.props.currentTrack.id.videoId;
          return (
              <div className='player'>
                  <YouTube
                    url={`http://www.youtube.com/watch?v=${  sourceId }`}
                    opts={this.opts}
                    onPlay={this.playTrack}
                    onPause={this.pauseTrack}
                    onEnd={this.props.onTrackEnd}
                  />
              </div>
          )
      }else {
          return(
              <div className='player'>
                <h2>Please add video's to the queue</h2>
              </div>
          )
      }
  }
}


export default Player;
