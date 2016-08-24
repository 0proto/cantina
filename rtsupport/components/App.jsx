import React, { Component } from 'react';
import ChannelSection from './channels/ChannelSection.jsx';
import UserSection from './users/UserSection.jsx';
import MessageSection from './messages/MessageSection.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      activeChannel: {},
      users: [],
      messages: []
    };
  }

  addChannel(name) {
    let {channels} = this.state;
    channels.push({id: channels.length, name});
    this.setState({channels});
    // TODO : Send to Go server
  }

  setChannel(activeChannel) {
    let {messages} = this.state;
    messages = [];
    this.setState({messages});
    this.setState({activeChannel});
    // TODO : Get channel messages from Go server
  }

  setUserName(name) {
    let {users} = this.state;
    users.push({id: users.length, name});
    this.setState({users});
    // TODO : Send to Go server
  }

  sendMessage(body) {
    let {messages, users} = this.state;
    let createdAt = new Date;
    let author = users.length > 0 ? users[0].name : 'anonymous_alien';
    messages.push({id: messages.length, body, createdAt, author});
    this.setState(messages);
    // TODO : Send to server
  }

  render() {
    return(
      <div className="app container-fluid">
        <div className="row">
          <div className="col-xs-12 col-md-3">
            <div className="row">
              <div className="col-xs-12">
                <ChannelSection 
                  {...this.state}
                  addChannel={this.addChannel.bind(this)}
                  setChannel={this.setChannel.bind(this)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <UserSection 
                  {...this.state}
                  setUserName={this.setUserName.bind(this)}
                />
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-9">
            <MessageSection 
              {...this.state}
              sendMessage={this.sendMessage.bind(this)}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App