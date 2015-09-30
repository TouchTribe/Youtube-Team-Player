import React from 'react';

class History extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};
  }

  getHistory(){
    if( this.state.history === null || this.storage.search_history === undefined ) {
        this.state.history = [];
        this.storage.setItem('search_history', '[]');
        // Recursion baby ..
        return this.getHistory();
    }else {
        return JSON.parse(this.storage.getItem('search_history'));
    }
  }

  render() {
      if( this.props.query !== '' && this.props.query !== null ){
          return (
              <div className='history'>Hello history</div>
          );
      }else {
          return <div className='history hidden'></div>
      }

  }
}

export default History;
