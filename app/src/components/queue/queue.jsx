import React from 'react';

class Queue extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            queue: this.props.queue
        };
    }

    render() {
        let queue = this.state.queue;
        let tracks = queue.map((track) => {
                    return (<div className='track'>
                        <div className='track__title'>{ track.name }</div>
                        <div className='track__artist'>{ track.artist }</div>
                    </div>);
                });
        return (
            <div className='track-list'>
                { tracks }
            </div>
        );
    }
}

export default Queue;
