import{ useState } from "react";
import { useNavigate } from "react-router-dom";
import { React } from 'react';
import { useLogin } from "../../../hooks/useLogin"

function LoginTherapist() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
    navigate(AppRoutes.myWaitingPatients)
  }

  return (
    <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          placeholder="Email"
          autoComplete="email"
          value={email}
        />
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Passwort"
          value={password}
        />

        <button disabled={isLoading}>Login</button>
        {error && <div>{error}</div>}

    </form>
  );
}

export { LoginTherapist };
