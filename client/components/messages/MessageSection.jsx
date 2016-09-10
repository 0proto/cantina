import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import MessageForm from './MessageForm.jsx';

class MessageSection extends Component {
  render() {
    let {activeChannel} = this.props;

    return (
      <div className='panel panel-primary'>
        <div className='panel-heading'>
          <strong>{activeChannel.name}</strong>
        </div>
        <div className='panel-body'>
          <MessageList {...this.props} />
          <MessageForm {...this.props} />
        </div>
      </div>
    )
  }
}

MessageSection.propTypes = {
  messages: React.PropTypes.array.isRequired,
  activeChannel: React.PropTypes.object.isRequired,
  sendMessage: React.PropTypes.func.isRequired
}

export default MessageSection