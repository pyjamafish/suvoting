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
	router.Get("/", func(writer http.ResponseWriter, request *http.Request) {
		_, err := writer.Write([]byte("Hello World"))
		if err != nil {
			log.Println(err)
		}
	})

	// 3. Use router to start the server
	err := http.ListenAndServe(":3000", router)
	if err != nil {
		log.Println(err)
	}
}
