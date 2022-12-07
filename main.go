// Package main defines the entry point to the program.
// It contains the code to start the server and the routing logic.
package main

import (
	"fmt"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/go-chi/render"
	"log"
	"net/http"
	"vote/server"
)

func main() {
	rs := server.NewAppResource()
	defer rs.Close()

	port := ":3456"
	fmt.Printf("Now serving! http://localhost%s\n", port)

	// 1. Create a new router
	router := chi.NewRouter()
	router.Use(cors.AllowAll().Handler)

	// 2. Register endpoints for frontend files
	fileServer := http.FileServer(http.Dir("./client/build"))
	router.Handle("/*", fileServer)

	// Register endpoints for backend
	router.Route("/api", func(router chi.Router) {
		router.Use(render.SetContentType(render.ContentTypeJSON))
		router.Route("/{branch}", func(router chi.Router) {
			router.Use(server.BranchCtx)
			router.Route("/candidates", func(router chi.Router) {
				router.Get("/", rs.GetCandidates)
				router.Post("/", rs.PostCandidates)
				router.Route("/{id}", func(router chi.Router) {
					router.Route("/votes", func(router chi.Router) {
						router.Patch("/", rs.PatchVotes)
					})
				})
			})
			router.Route("/answers", func(router chi.Router) {
				router.Get("/", rs.GetAnswers)
			})
			router.Get("/leaderboard", rs.GetLeaderboard)
			router.Get("/questions", rs.GetQuestions)
		})
	})

	// 3. Use router to start the server
	err := http.ListenAndServe(port, router)
	if err != nil {
		log.Println(err)
	}
}
