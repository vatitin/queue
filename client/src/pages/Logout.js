// Logout.js
import React, { useContext } from 'react';
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  const config = {
    headers: {
      "Content-Type": "application/json"
      },
      withCredentials: true
  }

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:3001/therapistAuth/logout', config);
      if (response.data.error) return alert(response.data.error)
      setAuthState(false);
      navigate("/")
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
