// Adapted from https://github.com/go-chi/chi/issues/403#issuecomment-469152247
package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
)

const port = ":3333"

func main() {
	fmt.Printf("Starting Server on Port %v\n", port)
	router := chi.NewRouter()
	server := &http.Server{
		Addr:         port,
		Handler:      router,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	router.Get("/foo", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{ "message": "bar" }`))
	})

	fileServer := http.FileServer(http.Dir("./client/build/"))
	router.Handle("/*", fileServer)

	panic(server.ListenAndServe())
}
