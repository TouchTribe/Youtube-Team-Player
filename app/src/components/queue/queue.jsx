import React from 'react';

class Queue extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            queue: []
        };
    }

    getQueue(){
        this.state.queue = [
            { name:'Some awesome track', artist: 'Some guy' },
            { name:'Some awesome track', artist: 'Some other guy' },
            { name:'Some awesome track', artist: 'Some other other guy' },
            { name:'Some awesome track', artist: 'Some other other other guy' },
            { name:'Some awesome track', artist: 'Some another other guy' },
            { name:'Some awesome track', artist: 'Other some guy' },
            { name:'Some awesome track', artist: 'Some guy' },
            { name:'Some awesome track', artist: 'Some guy' },
            { name:'Some awesome track', artist: 'Other some guy' },
            { name:'Some awesome track', artist: 'Some guy' },
            { name:'Some awesome track', artist: 'Some guy' },
            { name:'Some awesome track', artist: 'Some other other other guy' },
            { name:'Some awesome track', artist: 'Some guy' },
            { name:'Some awesome track', artist: 'Some other other other guy' },
            { name:'Some awesome track', artist: 'Some guy' }
        ];
        return this.state.queue;
    }

    render() {
        let queue = this.getQueue();
        let tracks = queue.map((track) => {
                    return (<div className='track'>
                        <div className='track__title'>{ track.name }</div>
                        <div className='track__artist'>{ track.artist }</div>
                    </div>);
                })

        console.log( queue )
        return (
            <div className='track-list'>
                { tracks }
            </div>
        );
    }
}

export default Queue;
