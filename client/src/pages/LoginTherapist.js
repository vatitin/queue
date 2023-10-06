import React, { useState } from "react";
import axios from "axios";

function LoginTherapist() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const data = {
      email: email,
      password: password,
    };
    axios.post(`http://localhost:3001/therapistAuth/login`, data).then((response) => {
        if (response.data.error) {
            return alert(response.data.error);
        } else {
        //todo change to cookie functionality
        sessionStorage.setItem("accessToken", response.data)
        }
    });
  };

  return (
    <div>
      <input
        type="text"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        placeholder="Email"
      />
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        placeholder="Passwort"
      />

      <button onClick={login}>Login</button>
    </div>
  );
}

export { LoginTherapist };
