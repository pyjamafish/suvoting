package server

import (
	"context"
	"fmt"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	"log"
	"math/rand"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type AppResource struct {
	hello  string
	Client *mongo.Client
}

// NewAppResource creates an AppResource that's connected to the database.
func NewAppResource() *AppResource {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	uri := os.Getenv("MONGODB_URI")
	if uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environmental variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/#environment-variable")
	}
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}
	rs := AppResource{
		Client: client,
	}
	return &rs
}

// Close disconnects from the database.
func (rs *AppResource) Close() {
	if err := rs.Client.Disconnect(context.TODO()); err != nil {
		panic(err)
	}
}

// Db returns the database we're interested in.
func (rs *AppResource) Db() *mongo.Database {
	return rs.Client.Database("voting")
}

func BranchCtx(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var branch string

		branch = chi.URLParam(r, "branch")
		if branch != "senate" && branch != "treasury" {
			data := map[string]string{
				"message": fmt.Sprintf(`Invalid branch "%s"; must be either "senate" or "treasury"`, branch),
			}
			render.Render(w, r, NewResponseFail(data))
			return
		}

		ctx := context.WithValue(r.Context(), "branch", branch)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// randomize randomizes a slice.
func randomize[T any](x []T) {
	rand.Seed(time.Now().UnixNano())
	rand.Shuffle(len(x), func(i, j int) {
		x[i], x[j] = x[j], x[i]
	})
}

func (rs *AppResource) GetCandidates(w http.ResponseWriter, r *http.Request) {
	branch := r.Context().Value("branch").(string)
	collection := rs.Db().Collection(branch)

	cur, err := collection.Find(r.Context(), bson.D{})
	if err != nil {
		render.Render(w, r, NewErrorResponse("Could not get cursor from db"))
		return
	}
	defer cur.Close(r.Context())

	var candidates []Candidate
	for cur.Next(r.Context()) {
		candidate := Candidate{}
		err := cur.Decode(&candidate)
		if err != nil {
			render.Render(w, r, NewErrorResponse("Could not decode into candidate"))
			return
		}

		candidates = append(candidates, candidate)
	}
	randomize(candidates)
	data := map[string]any{
		"candidates": candidates,
	}
	render.Render(w, r, NewResponseSuccess(data))
}
