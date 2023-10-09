import{ useState } from "react";
import React from "react";
import axios from "axios";

function LoginTherapist() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
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

    axios.post(`http://localhost:3001/therapistAuth/login`, data, config).then((response) => {
        if (response.data.error) {
          return alert(response.data.error);
        } else {
          //todo remove
          return alert("Login hat funktioniert.")
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
