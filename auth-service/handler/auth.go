package handler

import (
	"encoding/json"
	"net/http"
	"auth-service/utils"
	"auth-service/model"
)

var users = []model.User{
	{ID: 1, Username: "admin", Password: "password", Role: "admin"},
	{ID: 2, Username: "user", Password: "password", Role: "user"},
}

type TokenResponse struct {
	Token string `json:"token"`
	Exp   int64  `json:"exp"`
}

func Login(w http.ResponseWriter, r *http.Request) {
	var user model.User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	for _, u := range users {
		if u.Username == user.Username && u.Password == user.Password {
			token, exp, _ := utils.GenerateToken(u.Username, u.Role)
			json.NewEncoder(w).Encode(TokenResponse{Token: token, Exp: exp})
			return
		}
	}

	http.Error(w, "Invalid credentials", http.StatusUnauthorized)
}

func ValidateToken(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Token string `json:"token"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	claims, valid := utils.ValidateToken(req.Token)
	if !valid {
		http.Error(w, "Invalid token", http.StatusUnauthorized)
		return
	}

	json.NewEncoder(w).Encode(map[string]interface{}{
		"valid": true,
		"user":  claims.Username,
		"role":  claims.Role,
		"exp":   claims.ExpiresAt,
	})
}
