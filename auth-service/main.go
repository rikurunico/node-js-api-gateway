package main

import (
	"log"
	"net/http"
	"auth-service/handler"
	"auth-service/utils"
	"auth-service/model"
	"gorm.io/gorm"
)

func main() {
	// Connect to the database
	db := utils.ConnectDB()
	defer func() {
		sqlDB, _ := db.DB()
		sqlDB.Close()
	}()

	// Perform auto-migration
	if err := db.AutoMigrate(&model.User{}, &model.Item{}); err != nil {
		log.Fatal("failed to migrate database: ", err)
	}

	// Seed data
	SeedData(db)

	http.HandleFunc("/login", handler.Login)
	http.HandleFunc("/validate", handler.ValidateToken)

	log.Println("Auth Service running on port 8081")
	log.Fatal(http.ListenAndServe(":8081", nil))
}

// SeedData seeds the database with initial data if it is empty
func SeedData(db *gorm.DB) {
	// Check if there are existing users
	var userCount int64
	if err := db.Model(&model.User{}).Count(&userCount).Error; err != nil {
		log.Fatal("failed to count users: ", err)
	}

	if userCount == 0 {
		// Insert seed data
		users := []model.User{
			{Username: "admin", Password: "adminpassword", Role: "admin"},
			{Username: "user1", Password: "user1password", Role: "user"},
			{Username: "user2", Password: "user2password", Role: "user"},
		}

		if err := db.Create(&users).Error; err != nil {
			log.Fatal("failed to create users: ", err)
		}
		log.Println("Seeded users successfully")

		// Retrieve the IDs of the seeded users
		var seededUsers []model.User
		if err := db.Find(&seededUsers).Error; err != nil {
			log.Fatal("failed to find seeded users: ", err)
		}

		// Insert seed items
		items := []model.Item{
			{Name: "Item 1", Description: "Description for item 1", CreatedBy: seededUsers[0].ID},
			{Name: "Item 2", Description: "Description for item 2", CreatedBy: seededUsers[1].ID},
			{Name: "Item 3", Description: "Description for item 3", CreatedBy: seededUsers[0].ID},
		}

		if err := db.Create(&items).Error; err != nil {
			log.Fatal("failed to create items: ", err)
		}
		log.Println("Seeded items successfully")
	}
}
