import React from 'react';
import History from '../history/history';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            value: null,
            history: null
        };
        this.storage = window.localStorage;
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        console.log( this.state.value );
    }

    handleFocus(event) {
        console.log( event );
    }

    render() {
        var value = this.state.value;
        return (
            <div>
              <div className='search'>
                <div className='search__wrapper'>
                    <input type='search'
                           className='search__field'
                           placeholder='Search'
                           onFocus={this.handleFocus}
                           onChange={this.handleChange} />
                    <button className='search__submit'>Search</button>
                </div>
                <History query={value} />
              </div>
            </div>
    );
  }

}

export default Search;
