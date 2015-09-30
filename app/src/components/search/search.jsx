import React from 'react';
import History from '../history/history';
import SearchResults from '../search-results/search-results';
import { Client, TrackHandler } from 'spotify-sdk';
import * as _ from 'lodash';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
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

    handleSearch(event) {
        let query = this.state.value;
        const self = this;
        console.log('-->>>', query);
        this.track.search(query, {limit: 10}).then((trackCollection) => {
            let collection = [];
            for (let key in trackCollection) {
                console.log( key, _.includes(key, '_' ) )
                if( !_.includes(key, '_' ) ){
                    let track = trackCollection[ key ];
                    collection.push( track );
                }
            }
            self.setState({search_results: collection });
        });
    }

    handleFocus(event) {
        console.log( event );
    }

    render() {
        const self = this;
        return (
              <div className='search'>
                <div className='search__wrapper'>
                    <input type='search'
                           className='search__field'
                           placeholder='Search'
                           onFocus={this.handleFocus}
                           onChange={this.handleChange.bind( self )} />
                    <button className='search__submit' onClick={ this.handleSearch.bind( self ) }>Search</button>
                </div>
                <SearchResults results={ this.state.search_results } />
              </div>
    );
  }

}

export default Search;
