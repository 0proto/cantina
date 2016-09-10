import React, { Component } from 'react';

class MessageForm extends Component {
  onSubmit(e) {
    e.preventDefault();
    const node = this.refs.message;
    const message = node.value;
    this.props.sendMessage(message);
    node.value = '';
  }

  render() {
    let input;

    if (this.props.activeChannel.id !== undefined) {
      input = (
        <input
          ref='message'
          type='text'
          className='form-control'
          placeholder='Type something...'
        />
      )
    }

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className='form-group'>
          {input}
        </div>
      </form>
    )
  }
}

MessageForm.propTypes = {
  activeChannel: React.PropTypes.object.isRequired,
  sendMessage: React.PropTypes.func.isRequired
}

export default MessageForm