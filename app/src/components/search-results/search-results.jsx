import React from 'react';

class SearchResults extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};
    }

    render() {
        let results = this.props.results.map(result => {
            if( result._artists ){
                let artist_name = result._artists.map(a => a.name);
                return (
                    <div className='result'>
                        <div className='result__title'>{ result.name }</div>
                        <div className='result__artist'>{ artist_name.join(', ') }</div>
                    </div>
                )
            }
        });
        return (
            <div className='search-results'>
                { results }
            </div>

        );
    }
}

export default SearchResults;
