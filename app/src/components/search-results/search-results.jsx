import React from 'react';
import ListItem from './search-result-item';

class SearchResults extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};
    }

    render() {
        let results = this.props.results.map(result => {
            let snippet = result.snippet;
            return (
                <ListItem
                    id={ result.id.videoId }
                    title={ snippet.title }
                    track={result}
                    onSelect={ this.props.onSelect }/>
            )
        });
        return (
            <div className='search-results'>
                { results }
            </div>

        );
    }
}

export default SearchResults;
