package services

import (
	"database/sql"
	"learngo/models"
)

type UserService struct {
	Model *sql.DB
}

// CreateUser ...
func (us *UserService) CreateUser(name, secondName, fatherName, username string) (u models.User, err error) {
	u = models.User{Name: name, SecondName: secondName, FatherName: fatherName, UserName: username}
	err = us.Model.QueryRow("INSERT INTO users(name, secondname, fathername, username) values ($1, $2, $3, $4) RETURNING *",
		u.Name, u.SecondName, u.FatherName, u.UserName).Scan(&u.Id, &u.Name, &u.SecondName, &u.FatherName, &u.UserName)
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
	err = us.Model.QueryRow("SELECT * FROM users WHERE id=$1", id).Scan(&u.Id, &u.Name, &u.SecondName, &u.FatherName, &u.UserName)
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




