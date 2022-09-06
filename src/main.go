package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/gorilla/websocket"
	_ "github.com/lib/pq"
	"learngo/Websocket"
	"learngo/controllers"
	"learngo/services"
	"log"
	"net/http"
	"os"
)

// строка подключения postgresql
const dbUri = "user=postgres password=3141 dbname=rbstest host=localhost port=5432 sslmode=disable"

func createPostgreConnection(url string) *sql.DB {
	model, err := sql.Open("postgres", dbUri)
	if err != nil { // подключение к базе данных
		fmt.Println("Connection failed")
		log.Fatal(err)
	}

	fmt.Println("Database successfully connected")
	return model
}

type bodyImage struct {
	Sms string
	Image os.File
}

func main() {
	fs := http.FileServer(http.Dir("./client/build"))
	app := http.NewServeMux()
	// socket
	socket := Websocket.WebSocket{}
	socket.Init()

	model := createPostgreConnection(dbUri)
	controller := controllers.Controller{DB: model}
	defer model.Close()

	clients := make(map[*websocket.Conn]bool)

	app.HandleFunc("/api/users", func(w http.ResponseWriter, r *http.Request) { // роутинг без динамического пути
		if r.Method == http.MethodGet {
			controller.GetAllUsers(w, r)
		}
		if r.Method == http.MethodPost {
			controller.CreateUser(w, r)
		}

	})

	app.HandleFunc("/api/users/", func(w http.ResponseWriter, r *http.Request) { // роутинг с динамическим путем
		if r.Method == http.MethodGet {
			controller.GetUserById(w, r)
		}
		if r.Method == http.MethodPut {
			controller.UpdateUserById(w, r)
		}
		if r.Method == http.MethodDelete {
			controller.DeleteUserById(w, r)
		}
	})

	echo := func(w http.ResponseWriter, r *http.Request) {
		c, err := socket.Upgrader.Upgrade(w, r, nil)

		if err != nil {
			log.Print("upgrade:", err)
			return
		}
		defer c.Close()

		clients[c] = true

		service := services.UserService{Model: model}
		defer delete(clients, c)

		for {
			mt, _, err := c.ReadMessage()
			if err != nil {
				fmt.Println(err)
				break
			}

			if mt == websocket.CloseMessage {
				fmt.Println("close :(")
				delete(clients, c)
			}

			var result []byte
			users, _ := service.GetAllUsers()
			result, _ = json.Marshal(users)

			for client := range clients {
				client.WriteMessage(mt, result)
			}

		}
	}

	app.HandleFunc("/socket", echo)

	app.Handle("/", fs)

	fmt.Println("Server is listening on http://localhost:8000")
	err := http.ListenAndServe(":8000", app)
	if err != nil {
		log.Fatal(err)
	}
}
