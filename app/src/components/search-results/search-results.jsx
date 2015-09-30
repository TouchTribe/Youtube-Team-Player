import React from 'react';

class SearchResults extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};
    }

    render() {
        let results = this.props.results.map(result => {
            return (
                <div className='result'>
                    <div className='result__title'>{ result.name }</div>
                    <div className='result__artist'>{ result.artist }</div>
                </div>
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
