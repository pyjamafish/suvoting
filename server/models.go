package server

type Candidate struct {
	Id      int32    `json:"id"`
	Name    string   `json:"name"`
	Votes   int32    `json:"votes"`
	Answers []string `json:"answers"`
}

type LeaderboardEntry struct {
	Id    int32  `json:"id"`
	Name  string `json:"name"`
	Votes int32  `json:"votes"`
}

type Answer struct {
	Id     int32  `json:"id"`
	Name   string `json:"name"`
	Votes  int32  `json:"votes"`
	Answer string `json:"answer"`
}
