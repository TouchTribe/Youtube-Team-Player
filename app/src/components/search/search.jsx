import React from 'react';
import History from '../history/history';
import SearchResults from '../search-results/search-results';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            value: null,
            history: null,
            search_results: [
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
        this.storage = window.localStorage;
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        console.log(event.target.value, this.state.value );
    }

    handleFocus(event) {
        console.log( event );
    }

    render() {
        return (
              <div className='search'>
                <div className='search__wrapper'>
                    <input type='search'
                           className='search__field'
                           placeholder='Search'
                           onFocus={this.handleFocus}
                           onChange={this.handleChange} />
                    <button className='search__submit'>Search</button>
                </div>
                <History query={this.state.value} />
                <SearchResults results={ this.state.search_results } />
              </div>
    );
  }

}

export default Search;
