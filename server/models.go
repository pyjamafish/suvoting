package server

import "net/http"

type JSendStatus string

const (
	Success JSendStatus = "success"
	Fail    JSendStatus = "fail"
	Error   JSendStatus = "error"
)

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

type Response struct {
	Status JSendStatus `json:"status"`
	Data   any         `json:"data"`
}

func NewResponseSuccess(data any) *Response {
	return &Response{Status: Success, Data: data}
}

func NewResponseFail(data any) *Response {
	return &Response{Status: Fail, Data: data}
}

func (response *Response) Render(_ http.ResponseWriter, _ *http.Request) error {
	return nil
}

type ErrorResponse struct {
	Status  JSendStatus `json:"status"`
	Message string      `json:"message"`
}

func NewErrorResponse(message string) *ErrorResponse {
	return &ErrorResponse{Status: Error, Message: message}
}
