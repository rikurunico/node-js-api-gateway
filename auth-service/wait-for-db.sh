#!/bin/sh

# Wait for the database to be available
while ! nc -z db 5432; do
  echo "Waiting for database to start..."
  sleep 1
done

echo "Database is up - starting auth-service"
exec "$@"
