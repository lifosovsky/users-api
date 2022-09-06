package models

type User struct {
	Id         int
	Avatar     Avatar
	Name       string
	SecondName string
	FatherName string
	UserName   string
}

type Avatar struct {
	Image []byte
	Name  string
}
