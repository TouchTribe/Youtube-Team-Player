import React from 'react';

class Search extends React.Component {

  constructor(props) {
      super(props);
      this.props = props;
      this.state = {
          value: null
      };
  }

  handleChange(event) {
      this.setState({value: event.target.value});
      console.log( this.state.value );
  }

  render() {
      var value = this.state.value;
      return (
          <div className='search'>
            <div className='search__wrapper'>
                <input type='search' className='search__field' onChange={this.handleChange} />
                <button className='search__submit'>Search</button>
            </div>
        </div>
    );
  }
}

export default Search;
