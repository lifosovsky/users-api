package main

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"learngo/controllers"
	"log"
	"net/http"
)

// строка подключения postgresql
const dbUri = "user=postgres password=3141 dbname=rbstest host=localhost port=5432 sslmode=disable"

var err error

func main() {
	fs := http.FileServer(http.Dir("./client/build"))
	app := http.NewServeMux()
	model, err := sql.Open("postgres", dbUri); if err != nil { // подключение к базе данных
		fmt.Println("Connection failed")
		log.Fatal(err)
	}
	fmt.Println("Database successfully connected")
	controller := controllers.Controller{DB: model}
	defer controller.DB.Close()

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

	app.Handle("/", fs)

	fmt.Println("Server is listening on http://localhost:8000")
	err = http.ListenAndServe(":8000", app); if err != nil {
		log.Fatal(err)
	}
}
