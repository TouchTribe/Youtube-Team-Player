import React from 'react';

class ListItem extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};
    }

    render() {
        return (
            <div className='list-item'>
                <div className='item__title'>{ this.props.title }</div>
            </div>
        )
    }
}

export default ListItem;
