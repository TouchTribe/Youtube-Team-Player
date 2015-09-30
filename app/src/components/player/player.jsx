import React from 'react';

class Player extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};
  }

  render() {
    return (
        <div className='player'>player here</div>
    );
  }
}

export default Player;
