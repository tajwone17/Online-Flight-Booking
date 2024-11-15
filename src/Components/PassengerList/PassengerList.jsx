import React from 'react';

// Static data for passengers
const passengers = [
  {
    id: 1,
    firstName: 'John',
    middleName: 'Doe',
    lastName: 'Smith',
    contact: '123-456-7890',
    dob: '1990-01-01',
    paidBy: 'user',
    amount: 100,
  },
  {
    id: 2,
    firstName: 'Jane',
    middleName: 'Alice',
    lastName: 'Johnson',
    contact: '987-654-3210',
    dob: '1992-02-02',
    paidBy: 'user',
    amount: 150,
  },
  {
    id: 3,
    firstName: 'Michael',
    middleName: 'George',
    lastName: 'Williams',
    contact: '555-555-5555',
    dob: '1985-03-03',
    paidBy: 'User',
    amount: 200,
  },
  // Add more passenger data as needed
];

const PassengerList = () => {
  return (
    <main>
      {/* Conditionally render if admin is logged in */}
      {/* For simplicity, we'll assume the admin is logged in */}
      <div className="container-md mt-2">
        <h1 className="display-4 text-center text-white">Passenger List</h1>
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th scope="col">First Name</th>
              <th scope="col">Middle Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Contact</th>
              <th scope="col">D.O.B</th>
              <th scope="col">Paid By</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {passengers.map((passenger, index) => (
              <tr key={passenger.id} className="text-center">
                <td>{index + 1}</td>
                <td>{passenger.firstName}</td>
                <td>{passenger.middleName}</td>
                <td>{passenger.lastName}</td>
                <td>{passenger.contact}</td>
                <td>{passenger.dob}</td>
                <td>{passenger.paidBy}</td>
                <td>${passenger.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default PassengerList;
