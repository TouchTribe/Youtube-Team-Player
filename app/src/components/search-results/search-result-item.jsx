import React from 'react';

class SearchResultItem extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        this.props.onSelect(this.props.track);
    }

    render() {
        return (
            <div className='list-item__search' onClick={ this.handleClick } >
                <div className='item__artwork' style={{'background-image': `url(${this.props.track.snippet.thumbnails.default.url})`}}></div>
                <div className='item__title'>{ this.props.title }</div>
            </div>
        )
    }
}

export default SearchResultItem;
