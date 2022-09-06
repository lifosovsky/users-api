.PHONY: build
build:
		go build -v main.go
.PHONY: start
start:
		cd client; npm run build; cd ..; go run src/main.go
.PHONY: build-frontend
frontend:
		cd client; npm run build;
.PHONY: backend
backend:
		go run src/main.go
.DEFAULT_GOAL := start