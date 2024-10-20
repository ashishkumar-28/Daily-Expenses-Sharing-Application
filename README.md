# Daily Expenses Sharing Application

## Objective
Design and implement a backend for a daily-expenses sharing application. This application allows users to add expenses and split them based on three different methods: exact amounts, percentages, and equal splits.

## Features
- User management: Create and retrieve users.
- Expense management: Add expenses, and split them using equal, exact, or percentage methods.
- Balance sheet generation: View and download balance sheets.
- Data validation: Ensure input integrity and correct percentage calculations.

## Setup and Installation

1. **Clone the Repository**
   ```bash
   git clone <YOUR_REPOSITORY_URL>
   cd daily-expenses-sharing-app

2. **Install Dependencies**
Ensure you have Node.js and npm installed. 
Run:npm install

3. **Configure Environment**
Create a .env file in the root directory and add your database configuration:
DB_USERNAME=expenses_user
DB_PASSWORD=password123
DB_DATABASE=daily_expenses_db
DB_HOST=127.0.0.1
DB_DIALECT=mysql
PORT=5000

4. **Database Setup**
Make sure you have MySQL installed and a database created as specified in config/config.json. 
Run migrations if needed.

5. **Run the Application**
npm start
The server will start on http://localhost:5000.

6. **API Endpoints**

User Endpoints:

POST /api/users/create - Create a user.
GET /api/users/:id - Retrieve user details.
Expense Endpoints:

POST /api/expenses/add - Add an expense.
GET /api/expenses/:id - Retrieve expense by ID.
Balance Sheet Endpoint:

GET /api/balance-sheet - Generate and download the balance sheet.

## Testing
Ensure that your API endpoints are working as expected.
Test various scenarios for expense splitting and balance sheet generation.

