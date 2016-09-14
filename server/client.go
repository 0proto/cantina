package main

import (
	"github.com/gorilla/websocket"
	r "gopkg.in/dancannon/gorethink.v2"
)

type FindHandler func(string) (Handler, bool)

type SocketMessage struct {
	Name string      `json:"name"`
	Data interface{} `json:"data"`
}

type Client struct {
	send        chan SocketMessage
	socket      *websocket.Conn
	findHandler FindHandler
	session     *r.Session
}

func (client *Client) Read() {
	var message SocketMessage
	for {
		if err := client.socket.ReadJSON(&message); err != nil {
			break
		}
		if handler, found := client.findHandler(message.Name); found {
			handler(client, message.Data)
		}
	}
	client.socket.Close()
}

func (client *Client) Write() {
	for msg := range client.send {
		if err := client.socket.WriteJSON(msg); err != nil {
			break
		}
	}
	client.socket.Close()
}

func NewClient(socket *websocket.Conn, findHandler FindHandler,
	session *r.Session) *Client {
	return &Client{
		send:        make(chan SocketMessage),
		socket:      socket,
		findHandler: findHandler,
		session:     session,
	}
}
