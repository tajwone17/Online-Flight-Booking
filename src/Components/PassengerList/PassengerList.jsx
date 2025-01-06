import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PassengerList = () => {
  const { id } = useParams();
  const [passengers, setPassengers] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchPassengerData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/passengers/${id}`);
        setPassengers(response.data);
      } catch (error) {
        console.error('Error fetching passenger data:', error);
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/passengers-user/${id}`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchPassengerData();
    fetchUserData();
  }, [id]);

  return (
    <main>
      <div className="container-md mt-2">
        <h1 className="display-4 text-center text-white">Passenger List for Flight {id}</h1>
        <table className="table table-bordered">
          <thead className="thead-dark text-center">
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
            {passengers.map((passenger, index) => {
              // Find the user for the passenger
              const user = users.find(user => user.user_id === passenger.user_id);

              return (
                <tr key={passenger.passenger_id} className="text-center">
                  <td>{index + 1}</td>
                  <td>{passenger.f_name}</td>
                  <td>{passenger.m_name}</td>
                  <td>{passenger.l_name}</td>
                  <td>{passenger.mobile}</td>
                  <td>{new Date(passenger.dob).toLocaleDateString()}</td>
                  <td>{user ? user.username : 'Loading...'}</td>
                  <td>${user ? user.amount : 'Loading...'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default PassengerList;
