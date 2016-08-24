import React, { Component } from 'react';
import Channel from './Channel.jsx';

class ChannelList extends Component {
  render() {
    return (
      <ul className='nav nav-pills nav-stacked'>{
        this.props.channels.map( chan => {
          return (
            <Channel 
              key={chan.id}
              channel={chan}
              {...this.props}
            />
          )
        })
      }</ul>
    )
  }
}

ChannelList.propType = {
  channels: React.PropTypes.array.isRequired,
  setChannel: React.PropTypes.func.isRequired,
  activeChannel: React.PropTypes.object.isRequired
}

export default ChannelList