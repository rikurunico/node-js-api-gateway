FROM golang:1.20-alpine

# Install netcat-openbsd for waiting on the database to be ready
RUN apk add --no-cache netcat-openbsd

# Set the working directory
WORKDIR /app

# Copy application files
COPY . .

# Install Go dependencies
RUN go mod tidy

# Build the Go application
RUN go build -o auth-service

# Add a script to wait for the database to be ready
COPY wait-for-db.sh /usr/local/bin/wait-for-db.sh
RUN chmod +x /usr/local/bin/wait-for-db.sh

# Expose the port the app will run on
EXPOSE 8081

# Use the entrypoint script to wait for the database before starting the service
CMD ["/usr/local/bin/wait-for-db.sh", "./auth-service"]
