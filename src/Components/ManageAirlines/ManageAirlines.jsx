import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
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
    const toastId = toast.warn(
      <div>
        <p>Are you sure you want to delete this airline?</p>
        <button onClick={() => confirmDelete(id, toastId)} className="btn btn-danger me-2">
          Yes
        </button>
        <button onClick={() => toast.dismiss(toastId)} className="btn btn-secondary">
          No
        </button>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        hideProgressBar: true,
        toastId: "delete-confirm", 
      }
    );
  };

  const confirmDelete = (id, toastId) => {
    axios
      .delete(`http://localhost:3001/api/airlines/${id}`)
      .then((response) => {
        setAirlines(airlines.filter((airline) => airline.airline_id !== id));
        toast.success('Airline deleted successfully!');
        toast.dismiss(toastId);  // Dismiss the confirmation toast after deletion
      })
      .catch((error) => {
        toast.error('Failed to delete airline!');
        toast.dismiss(toastId);  // Dismiss the confirmation toast in case of failure
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
