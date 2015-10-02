import React from 'react';
import History from '../history/history';
import SearchResults from '../search-results/search-results';
import { Client, TrackHandler } from 'spotify-sdk';
import * as _ from 'lodash';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {
            value: null,
            history: null,
            search_results: []
        };
        this.track = new TrackHandler();
    }

    handleChange(event) {
        this.setState({value: event.target.value });
    }

    handleKeyPress(event) {
        if(event.keyCode === 13) this.handleSearch()
    }

    handleSearch() {
        let query = this.state.value;
        const self = this;
        this.track.search(query, {limit: 10}).then((trackCollection) => {
            let collection = [];
            for (let key in trackCollection) {
                if( !_.includes(key, '_' ) ){
                    let track = trackCollection[ key ];
                    collection.push( track );
                }
            }
            self.setState({search_results: collection });
        });
    }

    render() {

        return (
              <div className='search'>
                <div className='search__wrapper'>
                    <input type='search'
                           className='search__field'
                           placeholder='Search'
                           onChange={this.handleChange}
                           onKeyDown={this.handleKeyPress} />
                    <button className='search__submit' onClick={ this.handleSearch }>Search</button>
                </div>
                <SearchResults results={ this.state.search_results } />
              </div>
    );
  }

}

export default Search;
