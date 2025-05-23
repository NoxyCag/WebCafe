// src/pages/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const [login, setLogin] = useState("");
  const [pwd, setPwd] = useState("");
  const [erreur, setErreur] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://172.17.0.59:9000/api/login", {
        login,
        pwd,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      window.location.href = "/admin";

      setErreur(null);
      navigate("/admin");
    } catch (error) {
      console.error(error);
      setErreur("Identifiants incorrects");
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      {erreur && <p className="erreur">{erreur}</p>}

      <form onSubmit={handleLogin}>
        <label>Identifiant</label>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />

        <label>Mot de passe</label>
        <input
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          required
        />

        <button type="submit" onClick={handleLogin}>Se connecter</button>
      </form>
    </div>
  );
}
