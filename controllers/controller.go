package controllers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"learngo/models"
	"learngo/services"
	"net/http"
	"strconv"
	"strings"
)

type Controller struct {
	DB *sql.DB
}

func (c *Controller) CreateUser(w http.ResponseWriter, r *http.Request) {
	body, _ := ioutil.ReadAll(r.Body)
	s := services.UserService{Model: c.DB}
	u := models.User{}
	json.Unmarshal([]byte(string(body)), &u)
	response, err := s.CreateUser(u.Name, u.SecondName, u.FatherName, u.UserName) // обращение к сервису
	if err != nil {
		w.Write([]byte(err.Error()))
	}
	b, _ := json.Marshal(response)
	w.Write(b)
}

func (c *Controller) GetAllUsers(w http.ResponseWriter, r *http.Request) {
	s := services.UserService{Model: c.DB}
	result, err := s.GetAllUsers() // обращение к сервису
	if err != nil {
		w.Write([]byte(err.Error()))
	}
	b, _ := json.Marshal(result)
	w.Write(b)
}

func (c *Controller) GetUserById(w http.ResponseWriter, r *http.Request) {
	s := services.UserService{Model: c.DB}
	id, _ := strconv.Atoi(strings.Split(r.URL.Path, "/")[len(strings.Split(r.URL.Path, "/"))-1])
	result, err := s.GetUserById(id) // обращение к сервису
	if err != nil {
		w.Write([]byte("{error: " + err.Error() + "}"))
	}
	fmt.Println(id)
	b, _ := json.Marshal(result)
	w.Write(b)
}

func (c *Controller) UpdateUserById(w http.ResponseWriter, r *http.Request) {
	id, _ := strconv.Atoi(strings.Split(r.URL.Path, "/")[len(strings.Split(r.URL.Path, "/"))-1])
	s := services.UserService{Model: c.DB}
	resBody, _ := ioutil.ReadAll(r.Body)
	u := models.User{}
	json.Unmarshal([]byte(string(resBody)), &u)
	result, err := s.UpdateUserInfoById(id, u.Name, u.SecondName, u.FatherName, u.UserName); if err != nil { // обращение к сервису
		w.Write([]byte("{error:"+ err.Error() + "}"))
	}
	b, _ := json.Marshal(result)
	w.Write(b)
}

func (c *Controller) DeleteUserById(w http.ResponseWriter, r *http.Request) {
	s := services.UserService{Model: c.DB}
	id, _ := strconv.Atoi(strings.Split(r.URL.Path, "/")[len(strings.Split(r.URL.Path, "/"))-1])
	result, err := s.DeleteUserById(id) // обращение к сервису
	if err != nil {
		w.Write([]byte(err.Error()))
	}
	b, _ := json.Marshal(result)
	w.Write(b)
}
