import React, { Component } from 'react';
import ChannelSection from './channels/ChannelSection.jsx';
import UserSection from './users/UserSection.jsx';
import MessageSection from './messages/MessageSection.jsx';
import Socket from '../socket.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      activeChannel: {},
      users: [],
      messages: [],
      connected: false
    };
  }

  // Called only once after the Component is rendered
  componentDidMount() {
    let ws = new WebSocket('ws://localhost:4000')
    let socket = this.socket = new Socket(ws);
    socket.on('connect', this.onConnect.bind(this));
    socket.on('disconnect', this.onDisconnect.bind(this));
    socket.on('channel add', this.onAddChannel.bind(this));
    socket.on('user add', this.onAddUser.bind(this));
    socket.on('user edit', this.onEditUser.bind(this));
    socket.on('user remove', this.onRemoveUser.bind(this));
    socket.on('message send', this.onMessageSend.bind(this));
  }

  onConnect() {
    this.setState({connected: true});
    this.socket.emit('channel subscribe');
    this.socket.emit('user subscribe');
  }

  onDisconnect() {
    this.setState({connected: false});
  }

  // Inserts the new channel in the list of channels
  onAddChannel(channel) {
    let {channels} = this.state;
    channels.push(channel);
    this.setState({channels});
  }

  onAddUser(user) {
    let {users} = this.state;
    users.push(user);
    this.setState({users});
  }

  onEditUser(editUser) {
    let {users} = this.state;
    users = users.map(user => {
      if (editUser.id === user.id) {
        return editUser;
      }
      return user;
    });
    this.setState({users});
  }

  onRemoveUser(removeUser) {
    let {users} = this.state;
    users = users.filter(user => {
      return user.id !== removeUser.id;
    });
    this.setState({users});
  }

  onMessageSend(message) {
    let {messages} = this.state;
    messages.push(message);
    this.setState({messages});
  }

  // Sends a 'add channel' message to the WebSocket
  addChannel(name) {
    this.socket.emit('channel add', {name});
  }

  // Sets the channel the user wants to talk to
  setChannel(activeChannel) {
    this.setState({activeChannel});
    this.socket.emit('message unsubscribe');
    this.setState({messages: []});
    this.socket.emit('message subscribe', {channelId: activeChannel.id});
  }

  // Sets a name for the current user
  setUserName(name) {
    this.socket.emit('user edit', {name});
  }

  // Sends a message to the activeChannel
  sendMessage(body) {
    let {activeChannel} = this.state;
    this.socket.emit('message send', {
      channelId: activeChannel.id,
      body
    });
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