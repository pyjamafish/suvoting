package server

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/go-chi/chi"
	"github.com/go-chi/render"
	"log"
	"net/http"
	"os"

	_ "github.com/go-chi/chi"    //indirect
	_ "github.com/go-chi/render" //indirect
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

func BranchCtx(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var branch string

		branch = chi.URLParam(r, "branch")
		if branch != "senate" && branch != "treasury" {
			data := map[string]string{
				"message": fmt.Sprintf(`Invalid branch "%s"; must be either "senate" or "treasury"`, branch),
			}
			render.Render(w, r, NewResponseFail(data))
		}

		ctx := context.WithValue(r.Context(), "branch", branch)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func (rs *AppResource) Api(w http.ResponseWriter, r *http.Request) {
	coll := rs.Client.Database("sample_mflix").Collection("movies")
	title := "Back to the Future"

	var result bson.M
	err := coll.FindOne(context.TODO(), bson.D{{"title", title}}).Decode(&result)
	if err == mongo.ErrNoDocuments {
		fmt.Printf("No document was found with the title %s\n", title)
		return
	}
	if err != nil {
		panic(err)
	}

	jsonData, err := json.MarshalIndent(result, "", "    ")
	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	_, err = w.Write(jsonData)
	if err != nil {
		panic(err)
	}
}
