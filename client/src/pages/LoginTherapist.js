import{ useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { React, useContext } from 'react';


function LoginTherapist() {
  const {setAuthState} = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {

    //todo check if this is necessary
    const data = {
      email: email,
      password: password,
    };

    const config = {
      headers: {
        "Content-Type": "application/json"
        },
        withCredentials: true
    }

    const instance = axios.create({
      validateStatus: (status) => {
        return (status >= 200 && status < 300) || status === 401 || status === 403;
      },
    })

    try {
      const response = await instance.post(`http://localhost:3001/therapistAuth/login`, data, config)
      if (response.data.error) return alert(response.data.error)
      setAuthState(true)
      navigate(`/myPatients`,);
      return console.log(response);
    } catch (error) {
      alert(`Ein Fehler ist aufgetreten: ${error}`)
    }

  };

  return (
    <div>
      <input
        type="text"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        placeholder="Email"
        autoComplete="on"
      />
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        placeholder="Passwort"
        autoComplete="on"
      />

      <button onClick={login}>Login</button>
    </div>
  );
}

export { LoginTherapist };
