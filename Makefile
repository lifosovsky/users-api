.PHONY: build
build:
		go build -v main.go
.PHONY: start
start:
		go run main.go
.DEFAULT_GOAL := start