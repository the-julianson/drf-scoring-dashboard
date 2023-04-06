// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Dashboard() {
//   const [models, setModels] = useState([]);

//   const authHeaders = {
//     auth: {
//       username: process.env.REACT_APP_BASIC_AUTH_USERNAME,
//       password: process.env.REACT_APP_BASIC_AUTH_PASSWORD,
//     },
//   };

//   useEffect(() => {
//     fetchModels();
//   }, []);

//   const fetchModels = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_BASE_URL}`, authHeaders);
//       setModels(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Implement create, update, and delete operations

//   return (
//     <div>
//       {/* ... (existing Dashboard code) */}
//     </div>
//   );
// }

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [models, setModels] = useState([]);
  const [editingModel, setEditingModel] = useState(null);
  const [newModel, setNewModel] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    personal_id: '',
    requested_amount: '',
  });

  const authHeaders = {
    auth: {
      username: 'testuser@user.com',
      password: 'testpass123',
    },
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/credit/`, authHeaders);
      setModels(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateModel = async (model) => {
    try {
      await axios.put(`http://localhost:8000/api/credit/${model.id}/`, model, authHeaders);
      setEditingModel(null);
      fetchModels()
    } catch (error) {
      console.error(error);
    }
  };

  const deleteModel = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/credit/${id}`, authHeaders);
      fetchModels();
    } catch (error) {
      console.error(error);
    }
  };

  const createModel = async (model) => {
    try {
      await axios.post(`http://localhost:8000/api/credit/`, model, authHeaders);
      setNewModel({
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        personal_id: '',
        requested_amount: '',
      });
      fetchModels();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditChange = (e, model) => {
    const { name, value } = e.target;
    setEditingModel({ ...model, [name]: value });
  };

  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewModel({ ...newModel, [name]: value });
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Personal ID</th>
            <th>Requested Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {models.map((model) => (
            <tr key={model.id}>
              {editingModel && editingModel.id === model.id ? (
                <>
                  {['first_name', 'last_name', 'email', 'gender', 'personal_id', 'requested_amount'].map(
                    (field) => (
                      <td key={field}>
                        <input
                          type={field === 'requested_amount' ? 'number' : 'text'}
                          name={field}
                          value={editingModel[field]}
                          onChange={(e) => handleEditChange(e, model)}
                        />
                      </td>
                    )
                  )}
                  <td>
                    <button onClick={() => updateModel(editingModel)}>Save</button>
                    <button onClick={() => setEditingModel(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{model.first_name}</td>
                  <td>{model.last_name}</td>
                  <td>{model.email}</td>
                  <td>{model.gender}</td>
                  <td>{model.personal_id}</td>
                  <td>{model.requested_amount}</td>
                  <td>
                    <button onClick={() => setEditingModel(model)}>Edit</button>
                    <button onClick={() => deleteModel(model.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
          <tr>
            {['first_name', 'last_name', 'email', 'gender', 'personal_id', 'requested_amount'].map(
              (field) => (
                <td key={field}>
                  <input
                    type={field === 'requested_amount' ? 'number' : 'text'}
                    name={field}
                    value={newModel[field]}
                    onChange={handleNewChange}
                  />
                </td>
              )
            )}
            <td>
              <button onClick={() => createModel(newModel)}>Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;

//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Gender</th>
//             <th>Personal ID</th>
//             <th>Requested Amount</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {models.map((model) => (
//             <tr key={model.id}>
//               {editingModel && editingModel.id === model.id ? (
//                 <>
//                   {['first_name', 'last_name', 'gender', 'personal_id', 'requested_amount'].map(
//                     (field) => (
//                       <td key={field}>
//                         <input
//                           type={field === 'requested_amount' ? 'number' : 'text'}
//                           name={field}
//                           value={editingModel[field]}
//                           onChange={(e) => handleEditChange(e, model)}
//                         />
//                       </td>
//                     )
//                   )}
//                   <td>
//                     <button onClick={() => updateModel(editingModel)}>Save</button>
//                     <button onClick={() => setEditingModel(null)}>Cancel</button>
//                   </td>
