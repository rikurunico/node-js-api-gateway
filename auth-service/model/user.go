package model

import (
    "time"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username string `gorm:"uniqueIndex;size:255" json:"username"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

type Item struct {
	gorm.Model
	Name        string `gorm:"size:255" json:"name"`
	Description string `json:"description"`
	CreatedBy   uint   `json:"created_by"`
	CreatedAt   time.Time `gorm:"autoCreateTime" json:"created_at"`
}
