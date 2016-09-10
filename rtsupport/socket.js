import { EventEmitter } from 'events';

class Socket {
  constructor(ws = new WebSocket(), ee = new EventEmitter()) {
    this.ws = ws;
    this.ee = ee;
    ws.onmessage = this.message.bind(this);
    ws.onopen = this.open.bind(this);
    ws.onclose = this.close.bind(this);
  }

  // Message received from server
  on(name, fn) {
    this.ee.on(name, fn);    
  }

  off(name, fn) {
    this.ee.removeListener(name, fn);
  }

  // Message sent to server
  emit(name, data) {
    const message = JSON.stringify({name, data});
    this.ws.send(message);
  }

  // Called when the WebSocket receives a message
  // The message parameter should be formatted like below before being
  // stringified:
  // let msg = {
  //   name: 'noun verb',
  //   data: {...}
  // }
  message(e) {
    try {
      const message = JSON.parse(e.data);
      this.ee.emit(message.name, message.data);
    }
    catch(err) {
      this.ee.emit('error', err);
    }
  }

  // Called when the WebSocket connection is opened
  open() {
    this.ee.emit('connect');
  }

  // Called when the WebSocket connection is closed
  close() {
    this.ee.emit('disconnect');
  }
}

export default Socket;