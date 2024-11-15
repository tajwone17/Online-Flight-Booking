import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const ManageAirlines = () => {
  const [airlines, setAirlines] = useState([]); 

 
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/airlines') 
      .then((response) => {
        setAirlines(response.data.airlines);
      })
      .catch((error) => {
        console.error("Error fetching airlines:", error);
      });
  }, []); 

  
  const handleDelete = (id) => {
    
    axios
      .delete(`http://localhost:3001/api/airlines/${id}`)
      .then((response) => {
        
        setAirlines(airlines.filter((airline) => airline.airline_id !== id));
        toast.success('Airline deleted successfully!'); 
      })
      .catch((error) => {
       
        toast.error('Failed to delete airline!'); 
      });
  };

  return (
    <main>
      <div className="container-md mt-2">
        <h1 className="display-4 text-center text-white">AIRLINES LIST</h1>
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Seats</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {airlines.map((airline, index) => (
              <tr className="text-center" key={airline.airline_id}>
                <td scope="row">{index + 1}</td>
                <td>{airline.name}</td>
                <td>{airline.seats}</td>
                <td>
                  <button
                    className="btn"
                    type="button"
                    onClick={() => handleDelete(airline.airline_id)} 
                  >
                    <i className="text-danger fa fa-trash"></i> 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      

      <ToastContainer />
    </main>
  );
};

export default ManageAirlines;
