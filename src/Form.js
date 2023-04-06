import React, { useState } from 'react';
import axios from 'axios';
import styles from './Form.module.css';

function Form() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email:'',
    gender: '',
    personal_id: '',
    requested_amount: '',
  });

  const [message, setMessage] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post(`${process.env.REACT_APP_BASE_URL}`, formData);
      const response = await axios.post("http://localhost:8000/api/credit/", formData);
      console.log(response.data);

      if (response.data.approved) {
        setMessage('Tu solicitud fue aprobada.');
      } else {
        setMessage('Tu solicitud fue denegada.');
      }

      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        personal_id: '',
        requested_amount: '',
      });

      setShowForm(false);

    } catch (error) {
      setMessage('Ocurrio un error. Por favor intenta nuevamente.');
      console.error(error);
    }
  };

  const handleNewRequest = () => {
    setMessage(null);
    setShowForm(true);
  };

  return (
    <div className={styles.formcontainer}>
      {message && <p>{message}</p>}
        {showForm ? (
          <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Nombre:
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Apellido:
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Genero:
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Seleccionar</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="O">Otro</option>
            </select>
          </label>
          <br />
          <label>
            DNI:
            <input
              type="text"
              name="personal_id"
              value={formData.personal_id}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Monto:
            <input
              type="number"
              name="requested_amount"
              value={formData.requested_amount}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <button type="submit">Enviar</button>
        </form>
        ) : (
          <button onClick={handleNewRequest}>New Request</button>
        )}
      
    </div>
  );
}

export default Form;