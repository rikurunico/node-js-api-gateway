package main

import (
	"log"
	"net/http"
	"auth-service/handler"
)

func main() {
	http.HandleFunc("/login", handler.Login)
	http.HandleFunc("/validate", handler.ValidateToken)
	log.Println("Auth Service running on port 8081")
	log.Fatal(http.ListenAndServe(":8081", nil))
}
