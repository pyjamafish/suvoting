package main

import (
	"fmt"
	"github.com/go-chi/chi/v5"
	"log"
	"net/http"
	"vote/server"
)

func main() {
	rs := server.NewAppResource()
	defer rs.Close()

	port := ":3000"
	fmt.Printf("Now serving! http://localhost%s\n", port)

	// 1. Create a new router
	router := chi.NewRouter()

	// 2. Register an endpoint
	fileServer := http.FileServer(http.Dir("./client/build"))
	router.Handle("/*", fileServer)
	router.Get("/api", rs.Api)

	// 3. Use router to start the server
	err := http.ListenAndServe(port, router)
	if err != nil {
		log.Println(err)
	}
}
