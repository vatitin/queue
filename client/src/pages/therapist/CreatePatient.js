import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';
import { addPatientWithStatus } from '../../endpoints';

function CreatePatient() {
  const { patientStatus } = useParams();
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(addPatientWithStatus(patientStatus), formData, config);
      navigate(`/myPatients/${patientStatus}`);
    } catch (error) {
      // Handle error, e.g., show a message to the user
      console.error('Error creating patient:', error);
    }
  };

  useEffect(() => {
    if (!authState.status) {
      return navigate('/loginTherapist');
    }
  }, [authState.status, navigate]);

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="mb-3">
            <label htmlFor="firstName" className="form-label">Vorname</label>
            <input className="form-control" id="firstName" name="firstName" placeholder="Max" value={formData.firstName} onChange={handleChange}/>
        </div>

        <div className="mb-3"> 
            <label htmlFor="lastName" className="form-label">Nachname</label>
            <input className="form-control" id="lastName" name="lastName" placeholder="Mustermann" value={formData.lastName} onChange={handleChange}/>
        </div>

        <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input className="form-control" id="email" name="email" placeholder="meine@email.com" value={formData.email} onChange={handleChange}/>
        </div>

        <div className="mb-3">
          <label className="d-block">Geschlecht:</label>

          <input type="radio" className="btn-check" id="genderM" name="gender" value="M" autoComplete="off" onChange={handleChange}/>
          <label className="btn btn-outline-secondary" htmlFor="genderM">Männlich</label>

          <input type="radio" className="btn-check" id="genderW" name="gender" value="W" autoComplete="off" onChange={handleChange}/>
          <label className="btn btn-outline-secondary" htmlFor="genderW">Weiblich</label>

          <input type="radio" className="btn-check" id="genderD" name="gender" value="D" autoComplete="off" onChange={handleChange}/>
          <label className="btn btn-outline-secondary" htmlFor="genderD">Divers</label>
        </div>

        <button type="submit">Hinzufügen</button>
      </form>
    </div>
  );
}

export default CreatePatient;
