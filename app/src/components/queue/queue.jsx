import React from 'react';
import ListItem from '../list-item/list-item';

class Queue extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            queue: this.props.queue
        };
    }
    componentWillReceiveProps(newProps)
    {
        this.setState({
            queue: newProps.queue
        });
        if (! newProps.queue.length)
            return;
    }
    render() {
        let queue = this.state.queue;
        let items = queue.map((track) => {
            return(<ListItem
                id={ track.id.videoId }
                title={ track.snippet.title }
                track={track}/>)
            });
        return (
            <div className='track-list'>
                { items }
            </div>
        );
    }
}

export default Queue;
