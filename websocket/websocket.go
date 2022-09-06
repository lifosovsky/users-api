package Websocket

import (
	"github.com/gorilla/websocket"
	"learngo/models"
)

type SocketQuery struct {
	UserData models.User
	Method string
	EndPoint string
}

type WebSocket struct {
	Upgrader *websocket.Upgrader
	Query    SocketQuery
}

func (w *WebSocket) Init() {
	upgrader := websocket.Upgrader{}
	w.Upgrader = &upgrader
}

type ConnectUser struct {
	Websocket *websocket.Conn
	ClientIP string
}

func NewConnectUser(ws *websocket.Conn, clientIP string) *ConnectUser {
	return &ConnectUser{
		Websocket: ws,
		ClientIP: clientIP,
	}
}
