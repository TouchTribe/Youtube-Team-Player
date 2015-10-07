import React from 'react';
import History from '../history/history';
import SearchResults from '../search-results/search-results';
import * as _ from 'lodash';

const searchUrl = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDz2eejQS8PdCjeF0sNPWJQLnsCg-Zm-ZA&part=snippet&maxResults=50&type=video&q=';

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
        fetch(searchUrl + query).then(res => res.json())
        .then((body) => {
            self.setState({search_results: body.items });
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
                <SearchResults results={ this.state.search_results } onSelect={ this.props.onSelect } />
              </div>
    );
  }

}

export default Search;
