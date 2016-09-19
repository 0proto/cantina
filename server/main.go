package main

import (
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	r "gopkg.in/dancannon/gorethink.v2"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	session, err := r.Connect(r.ConnectOpts{
		Address:  os.Getenv("DB_ADDRESS"),
		Database: os.Getenv("DB_NAME"),
	})

	if err != nil {
		log.Panic(err.Error())
	}

	router := NewRouter(session)

	router.Handle("channel add", addChannel)
	router.Handle("channel subscribe", subscribeChannel)
	router.Handle("channel unsubscribe", unsubscribeChannel)

	router.Handle("user edit", editUser)
	router.Handle("user subscribe", subscribeUser)
	router.Handle("user unsubscribe", unsubscribeUser)

	router.Handle("message add", addChannelMessage)
	router.Handle("message subscribe", subscribeChannelMessage)
	router.Handle("message unsubscribe", unsubscribeChannelMessage)
	http.Handle("/", router)
	http.ListenAndServe(":4000", nil)
}
