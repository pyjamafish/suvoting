package main

import (
	"fmt"
	"github.com/go-chi/chi/v5"
	"log"
	"net/http"
	"os"
	"vote/server"
)

func main() {
	rs := server.NewAppResource()
	defer rs.Close()

	hostname, err := os.Hostname()
	if err != nil {
		panic(err)
	}
	port := ":3456"
	fmt.Printf("Now serving! http://%s%s\n", hostname, port)

	// 1. Create a new router
	router := chi.NewRouter()

	// 2. Register an endpoint
	fileServer := http.FileServer(http.Dir("./client/build"))
	router.Handle("/*", fileServer)
	router.Get("/api", rs.Api)

	// 3. Use router to start the server
	err = http.ListenAndServe(port, router)
	if err != nil {
		log.Println(err)
	}
}
