import React, { Component } from 'react';
import fecha from 'fecha';

class Message extends Component {
  render() {
    let {message} = this.props;
    let createdAt = fecha.format(new Date(message.createdAt), 'DD/MM HH:mm:ss');

    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="message-header">
            <strong>{message.author}</strong>&nbsp;
            <i>[{createdAt}]</i><br />
          </div>
          <div className="message-content">
            {message.body}
          </div>
        </div>
      </div>
    )
  }
}

Message.propTypes = {
  message: React.PropTypes.object.isRequired
}

export default Message