package handler

import (
	"encoding/json"
	"net/http"
	"auth-service/utils"
	"auth-service/model"
	"gorm.io/gorm"
)

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

	// Get user from database
	var dbUser model.User
	if err := utils.DB.Where("username = ?", user.Username).First(&dbUser).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		} else {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}

	if dbUser.Password == user.Password {
		token, exp, _ := utils.GenerateToken(dbUser.Username, dbUser.Role)
		json.NewEncoder(w).Encode(TokenResponse{Token: token, Exp: exp})
		return
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
