Online Flight Booking System
Purpose
This project is an online flight booking system that allows users to search and book flights, make payments, and manage flight details. Additionally, the system includes an Admin Panel for managing flight listings, airlines, and more.

Technologies Used
Frontend: React.js, Axios, Bootstrap, Font Awesome
Backend: Express.js (for the API), Node.js
Database: MySQL
Payment Integration: (Stripe, PayPal, or custom payment logic)
Authentication: JWT, Passport.js (for user authentication)
Features
User Features:
Search Flights: Users can search for flights based on criteria like destination, class, and date.
Book Tickets: Once a flight is selected, users can proceed to book tickets and provide passenger details.
Payment: A secure payment form to process transactions.
Booking Confirmation: Once the payment is successful, the user receives a booking confirmation with a seat number.
Admin Panel Features:
Dashboard: The admin can view a summary of the system's activities, such as the number of bookings.
Add Flight: Admin can add new flight details such as flight number, departure, destination, and more.
List Flights: View a list of all flights available in the system.
Manage Airlines: Admin can manage airlines (add, update, or remove airline details).
How to Use
Frontend Setup:
Clone the repository:
bash
Copy code
git clone (https://github.com/tajwone17/Online-Flight-Booking)
Navigate to the frontend directory:
bash
Copy code
cd frontend
Install dependencies:
bash
Copy code
npm install
Run the development server:
bash
Copy code
npm start
Your app should now be running on http://localhost:3000.
Backend Setup:
Clone the repository:
bash
Copy code
git clone https://github.com/tajwone17/Online-Flight-Booking
Navigate to the backend directory:
bash
Copy code
cd backend
Install dependencies:
bash
Copy code
npm install
Configure the database settings and environment variables (such as JWT secret and database credentials).
Start the backend server:
bash
Copy code
npm start
Admin Panel:
To access the Admin Panel, login with admin credentials.
On the dashboard, you can manage flights, airlines, and other system settings.
How It Works:
User Flow:
Search for Flights: A user can search for available flights based on various criteria.
Select a Flight: Once a flight is selected, the user can proceed to fill in the passenger details.
Payment: The user will make the payment for the booking.
Booking Confirmation: After a successful payment, the user receives a booking confirmation with their seat number.
Admin Flow:
Admin Dashboard: Admin users can view system activity like the number of bookings.
Manage Flights: Admin can add, edit, or delete flight listings.
Manage Airlines: Admin can manage airline details (add, update, or remove).
