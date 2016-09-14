package main

import (
	"github.com/mitchellh/mapstructure"
	r "gopkg.in/dancannon/gorethink.v2"
)

func addChannel(client *Client, data interface{}) {
	var channel Channel

	err := mapstructure.Decode(data, &channel)

	if err != nil {
		client.send <- SocketMessage{"error", err.Error()}
		return
	}

	go func() {
		err = r.Table("channels").
			Insert(channel).
			Exec(client.session)

		if err != nil {
			client.send <- SocketMessage{"error", err.Error()}
		}
	}()
}
