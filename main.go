package main

import (
	"github.com/go-chi/chi/v5"
	"log"
	"net/http"
)

func main() {
	// 1. Create a new router
	router := chi.NewRouter()

	// 2. Register an endpoint
	fileServer := http.FileServer(http.Dir("/client/build"))
	router.Handle("/*", http.StripPrefix("/client/build/", fileServer))

	// 3. Use router to start the server
	err := http.ListenAndServe(":3000", router)
	if err != nil {
		log.Println(err)
	}
}
