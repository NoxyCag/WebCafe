import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import Panier from "../pages/Panier";
import ModifierDosette from "../pages/ModifierDosette";
import NouvelleDosette from "../pages/NouvelleDosette";
import { verifierToken } from "../services/api";

export default function AppRouter() {
  const [tokenValide, setTokenValide] = useState(null);

  useEffect(() => {
    const check = async () => {
      const estValide = await verifierToken();
      setTokenValide(estValide);
    };
    check();
  }, []);

  if (tokenValide === null) {
    return <p style={{ padding: "2rem" }}>Vérification du token...</p>;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          tokenValide ? <Admin /> : <Navigate to="/login" replace />
        }
      />
      <Route path="/panier" element={<Panier />} />
      <Route
        path="/admin/modifier/:id"
        element={
          tokenValide ? <ModifierDosette /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/admin/nouveau"
        element={
          tokenValide ? <NouvelleDosette /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/admin/modifier/:id"
        element={
          tokenValide ? <ModifierDosette /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
}