````markdown
# **SkyTrip System**

## **Purpose**

This **SkyTrip System** is a comprehensive web application designed to allow users to search, book, and manage flight reservations. The system provides users with the ability to select flights, make secure payments, and receive booking confirmations. Additionally, an **Admin Panel** is included for administrators to manage flight listings, airlines, and other related functionalities.

---

## **Technologies Used**

- **Frontend**:

  - React.js
  - Axios
  - Bootstrap
  - Font Awesome

- **Backend**:

  - Express.js (API)
  - Node.js

- **Database**:

  - MySQL

- **Authentication**:
  - JWT (JSON Web Tokens)

---

## **Features**

### **User Features**

- **Search Flights**: Search for flights by destination, class, and date.
- **Book Tickets**: Select a flight, enter passenger details, and proceed to booking.
- **Payment**: Secure payment gateway to process payments.
- **Booking Confirmation**: Upon successful payment, a booking confirmation with seat number is displayed.

### **Admin Panel Features**

- **Dashboard**: View a summary of system activity such as bookings.
- **Add Flight**: Admin can add new flight details, including flight number, departure, and destination.
- **List Flights**: View all available flights in the system.
- **Manage Airlines**: Admin can manage airlines by adding, editing, or removing airline details.

---

## **How to Use**

### **Frontend Setup**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tajwone17/Online-Flight-Booking
   ```
````

2. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run the development server**:
   ```bash
   npm start
   ```
   Your app should now be running at [http://localhost:3000](http://localhost:3000).

---

### **Backend Setup**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tajwone17/Online-Flight-Booking
   ```
2. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Configure environment variables**:
   - Set up the database connection and JWT secret.
5. **Start the backend server**:
   ```bash
   npm start
   ```

---

### **Admin Panel**

- **Access**: Admin can access the Admin Panel by logging in with admin credentials.
- **Manage Flights**: Admin can view and manage flight details such as adding, editing, or removing flights.
- **Manage Airlines**: Admin can manage airline information (add, update, or delete airlines).

---

## **How It Works**

### **User Flow**

1. **Search for Flights**: The user can search for available flights based on criteria such as destination, class, and date.
2. **Select a Flight**: After searching, the user selects a flight and fills in their passenger details.
3. **Payment**: The user proceeds to a secure payment gateway to complete the transaction.
4. **Booking Confirmation**: After successful payment, the user receives a booking confirmation, including their seat number.

---

### **Admin Flow**

1. **Admin Dashboard**: Admin users can view a system overview, including the total number of bookings.
2. **Manage Flights**: Admin can add, edit, or delete flight listings.
3. **Manage Airlines**: Admin can manage airline details by adding, updating, or removing them.

---
## **Resources**

1. **Presentation Slide**:https://docs.google.com/presentation/d/1Vxxu7S1OVuszXcVatxM6Y5eDB12fbOsd/edit#slide=id.p1

2. **Project Demo Video**:https://drive.google.com/file/d/1Mugk_ohRs-ZIVLUzUB197BVAMCPAxrjT/view?usp=drive_link


## **License**

This project is open-source and available under the [MIT License](LICENSE).

```

```
