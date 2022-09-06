package services

import (
	"database/sql"
	"fmt"
	"learngo/models"
)

type UserService struct {
	Model *sql.DB
}

var picDir = "/pics"

// CreateUser ...
func (us *UserService) CreateUser(newUser *models.User) (u models.User, err error) {
	u = models.User{Name: newUser.Name, SecondName: newUser.SecondName, FatherName: newUser.FatherName, UserName: newUser.UserName}
	err = us.Model.QueryRow("INSERT INTO users(name, secondname, fathername, username) values ($1, $2, $3, $4) RETURNING *",
		u.Name, u.SecondName, u.FatherName, u.UserName).Scan(&u.Id, &u.Name, &u.SecondName, &u.FatherName, &u.UserName)
	err = us.Model.QueryRow("INSERT INTO avatars(name, image, user_id) values($1, $2, $3) RETURNING avatars.image, avatars.name",
		newUser.Avatar.Name, newUser.Avatar.Image, u.Id).
		Scan(&u.Avatar.Image, &u.Avatar.Name)
	fmt.Println("error: \n", err)
	return
}

// GetAllUsers ...
func (us *UserService) GetAllUsers() (array []models.User, err error) {
	r, e := us.Model.Query("SELECT * FROM users")
	if e != nil {
		return
	}
	for r.Next() {
		h := models.User{}
		r.Scan(&h.Id, &h.Name, &h.SecondName, &h.FatherName, &h.UserName)
		array = append(array, h)
	}
	return
}

// GetUserById ...
func (us *UserService) GetUserById(id int) (u models.User, err error) {
	//err = us.Model.QueryRow("SELECT * FROM users WHERE id=$1", id).Scan(&u.Id, &u.Name, &u.SecondName, &u.FatherName, &u.UserName)
	err = us.Model.QueryRow(
		"SELECT u.id, u.name, u.secondname, u.fathername, u.username, av.name, av.image FROM users u INNER JOIN avatars av on av.user_id=u.id WHERE u.id=$1",
		id).Scan(&u.Id, &u.Name, &u.SecondName, &u.FatherName, &u.UserName, &u.Avatar.Name, &u.Avatar.Image)
	return
}

// DeleteUserById ...
func (us *UserService) DeleteUserById(id int) (u models.User, err error) {
	err = us.Model.QueryRow("DELETE FROM users WHERE id=$1 returning *", id).Scan(&u.Id, &u.Name, &u.SecondName, &u.FatherName, &u.UserName)
	return
}

// UpdateUserInfoById ...
func (us *UserService) UpdateUserInfoById(id int, name, secondName, fatherName, username string) (u models.User, err error) {
	err = us.Model.QueryRow("UPDATE users SET (name, secondname, fathername, username) = ($2, $3, $4, $5) WHERE id=$1 returning *",
		id, name, secondName, fatherName, username).Scan(&u.Id, &u.Name, &u.SecondName, &u.FatherName, &u.UserName)
	return
}
