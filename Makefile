.PHONY: build
build:
		go build -v main.go
.PHONY: start
start:
		cd client; npm run build; cd ..; go run main.go
.PHONY: build-frontend
frontend:
		cd client; npm run build;
.DEFAULT_GOAL := start