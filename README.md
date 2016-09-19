# Cantina

This is a prototype chat app made with Golang, RethinkDB and React.js, with the help of James Moore's tutorial on [Udemy](https://www.udemy.com/realtime-apps-with-reactjs-golang-rethinkdb/learn/v4/overview).

## Installation

### Requirements

* A recent version of Go
* Node.js >= 4.0
* RethinkDB

### Setup the env

Create a `.env` file in the `server` folder and setup your your RethinkDB ENV variables. Ex:
```
DB_ADDRESS=localhost:32769
DB_NAME=rtsupport
```

### Run the server
```
cd server
go run *.go
```

### Run the client
```
cd client
webpack-dev-server --port 4001
```

You can then visit localhost:4001 in your browser!

![Screencap](https://raw.githubusercontent.com/fakenine/cantina/master/screen.png)