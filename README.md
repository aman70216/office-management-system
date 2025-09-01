Office Management System 🏢

A simple Office Management System built with Node.js, Express, MongoDB, and EJS.
This project allows you to manage Departments and Employees with full CRUD operations.

## Features

Manage Departments (Add, Edit, Delete)

Manage Employees (Add, Edit, Delete)

Employee ↔ Department relationships

Employee supervisor selection

Pagination, search & filter

Dynamic Country/State/City selection via API

Clean UI with EJS + Bootstrap/Tailwind

## Screenshots
sreenshots/Home.png
sreenshots/employees.png
sreenshots/Department.png


## Tech Stack

Backend: Node.js, Express.js

Database: MongoDB + Mongoose

Frontend: EJS + Bootstrap/Tailwind CSS

External API: Axios (for location data)

## Installation & Setup
1. Clone the repository
git clone https://github.com/your-username/office-management-system.git
cd office-management-system

2. Install dependencies
npm install

3. Configure environment variables

Create a .env file in the root folder:

MONGO_URI=mongodb://127.0.0.1:27017/officeDB
PORT=3000

4. Start the server
npm start


Open your browser at:

http://localhost:3000

## Future Improvements

JWT-based authentication for admin login

Role-based access control (Admin / Employee)

Deploy to Heroku / Vercel

Replace EJS with React or Next.js for frontend

## Author

AMAN MISHRA
aman.fullstackdev.@gmail.com


## LinkedIn
https://www.linkedin.com/in/aman-mishra-fullstack-devoloper/

## How it works in a nutshell

Admin can add, edit, delete Departments and Employees.

Employees can be assigned supervisors and departments.

Pagination, search, and filters help manage large employee lists.

Locations are dynamically fetched via API when adding/editing employees.
