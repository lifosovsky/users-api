package controllers

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"io"
	"learngo/models"
	"learngo/services"
	"net/http"
	"strconv"
	"strings"
)

type Controller struct {
	DB *sql.DB
}

func setupCORS(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func (c *Controller) CreateUser(w http.ResponseWriter, r *http.Request) {
	setupCORS(&w, r)
	r.ParseMultipartForm(32 << 20)
	image, h, _ := r.FormFile("image")
	defer image.Close()
	imageBytes := bytes.NewBuffer(nil)
	io.Copy(imageBytes, image)
	user := models.User{
		Name:       r.Form.Get("Name"),
		SecondName: r.Form.Get("SecondName"),
		FatherName: r.Form.Get("FatherName"),
		UserName:   r.Form.Get("FatherName"),
		Avatar: models.Avatar{
			Name: h.Filename, Image: imageBytes.Bytes(),
		},
	}
	s := services.UserService{Model: c.DB}
	response, err := s.CreateUser(&user)
	if err != nil {
		w.Write([]byte(err.Error()))
	}

	b, _ := json.Marshal(response)
	w.Write(b)
}

func (c *Controller) GetAllUsers(w http.ResponseWriter, r *http.Request) {
	setupCORS(&w, r)
	s := services.UserService{Model: c.DB}
	result, err := s.GetAllUsers()
	if err != nil {
		w.Write([]byte(err.Error()))
	}
	b, _ := json.Marshal(result)
	w.Write(b)
}

func (c *Controller) GetUserById(w http.ResponseWriter, r *http.Request) {
	setupCORS(&w, r)
	s := services.UserService{Model: c.DB}
	id, _ := strconv.Atoi(strings.Split(r.URL.Path, "/")[len(strings.Split(r.URL.Path, "/"))-1])
	result, err := s.GetUserById(id)
	if err != nil {
		w.Write([]byte("{error: " + err.Error() + "}"))
	}
	b, _ := json.Marshal(result)
	w.Write(b)
}

func (c *Controller) UpdateUserById(w http.ResponseWriter, r *http.Request) {
	setupCORS(&w, r)
	r.ParseMultipartForm(32 << 20)
	id, _ := strconv.Atoi(strings.Split(r.URL.Path, "/")[len(strings.Split(r.URL.Path, "/"))-1])
	s := services.UserService{Model: c.DB}
	result, err := s.UpdateUserInfoById(
		id,
		r.Form.Get("Name"),
		r.Form.Get("SecondName"),
		r.Form.Get("FatherName"),
		r.Form.Get("UserName"))
	if err != nil {
		w.Write([]byte(err.Error()))
	}
	b, _ := json.Marshal(result)
	w.Write(b)
}

func (c *Controller) DeleteUserById(w http.ResponseWriter, r *http.Request) {
	setupCORS(&w, r)
	s := services.UserService{Model: c.DB}
	id, _ := strconv.Atoi(strings.Split(r.URL.Path, "/")[len(strings.Split(r.URL.Path, "/"))-1])
	result, err := s.DeleteUserById(id) // обращение к сервису
	if err != nil {
		w.Write([]byte(err.Error()))
	}
	b, _ := json.Marshal(result)
	w.Write(b)
}
