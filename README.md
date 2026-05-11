# Flights Service
<!-- [![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/sidparashar2001/flights-service) -->

This repository contains the backend service for a flight management system. It is built with Node.js and Express, following a layered architecture. It provides RESTful APIs to manage flights, airplanes, airports, and cities.

## Features

*   **CRUD Operations:** Full Create, Read, Update, and Delete functionality for airplanes and airports.
*   **Flight Management:** Create and search for flights with advanced filtering and sorting options.
*   **City Management:** Create and associate cities with airports.
*   **Layered Architecture:** Organized structure with routes, controllers, services, and repositories for maintainability and scalability.
*   **Database Management:** Uses Sequelize ORM with migrations and seeders for database schema and data management.
*   **Request Validation:** Middlewares to validate incoming API requests.
*   **Structured Logging:** Utilizes Winston for application logging.

## Tech Stack

*   **Backend:** Node.js, Express.js
*   **Database:** MySQL
*   **ORM:** Sequelize
*   **Logging:** Winston
*   **Environment Variables:** Dotenv

## Project Structure

The project follows a standard layered architecture to separate concerns:

```
src
├── config/         # Server, database, and logger configuration
├── controllers/    # Handle API request and response logic
├── middlewares/    # Custom middlewares for validation, etc.
├── migrations/     # Database migration files (Sequelize)
├── models/         # Sequelize data models
├── repositories/   # Data access layer for database interactions
├── routes/         # API route definitions (versioned)
├── seeders/        # Database seed files
├── services/       # Business logic layer
└── utils/          # Utility functions, error handlers, enums
```

## Getting Started

### Prerequisites

*   Node.js
*   A running MySQL server

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sidparashar2001/flights-service.git
    cd flights-service
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure the database:**
    Update the development environment settings in `src/config/config.json` with your MySQL credentials (username, password, database name).

4.  **Set up environment variables:**
    Create a `.env` file in the root directory and specify the port for the server.
    ```env
    PORT=3000
    ```

5.  **Run database migrations:**
    This will create the necessary tables in your database based on the Sequelize models.
    ```bash
    npx sequelize-cli db:migrate
    ```

6.  **(Optional) Seed the database:**
    To populate the database with initial data (e.g., sample airplanes), run the seeder files.
    ```bash
    npx sequelize-cli db:seed:all
    ```

7.  **Start the server:**
    The server will start in development mode with `nodemon`, which automatically restarts on file changes.
    ```bash
    npm run dev
    ```
    The service will be available at `http://localhost:3000`.

## API Endpoints

All endpoints are prefixed with `/api/v1`.

### Airplanes

*   `POST /airplanes` - Create a new airplane.
    *   **Body:** `{ "modelNumber": "string", "capacity": "integer" }`
*   `GET /airplanes` - Get a list of all airplanes.
*   `GET /airplanes/:id` - Get a specific airplane by its ID.
*   `DELETE /airplanes/:id` - Delete an airplane by its ID.
*   `PATCH /airplanes/:id` - Update an airplane's details.

### Airports

*   `POST /airports` - Create a new airport.
    *   **Body:** `{ "name": "string", "code": "string", "address": "string", "cityId": "integer" }`
*   `GET /airports` - Get a list of all airports.
*   `GET /airports/:id` - Get a specific airport by its ID.
*   `DELETE /airports/:id` - Delete an airport by its ID.
*   `PATCH /airports/:id` - Update an airport's details.

### Cities

*   `POST /cities` - Create a new city.
    *   **Body:** `{ "name": "string" }`

### Flights

*   `POST /flights` - Create a new flight.
    *   **Body:**
        ```json
        {
          "flightNumber": "string",
          "airplaneId": "integer",
          "departureAirportId": "string",
          "arrivalAirportId": "string",
          "arrivalTime": "datetime",
          "departureTime": "datetime",
          "price": "integer",
          "boardingGate": "string",
          "totalSeats": "integer"
        }
        ```
*   `GET /flights` - Get all flights with optional filtering and sorting.
    *   **Query Parameters:**
        *   `trips`: Filter by departure and arrival airport codes (e.g., `MUM-DEL`).
        *   `price`: Filter by price range (e.g., `1000-5000`).
        *   `travellers`: Filter by a minimum number of available seats.
        *   `tripDate`: Filter by departure date (e.g., `2024-05-10`).
        *   `sort`: Sort results (e.g., `price_ASC`, `departureTime_DESC`).
*   `GET /flights/:id` - Get a specific flight by its ID.