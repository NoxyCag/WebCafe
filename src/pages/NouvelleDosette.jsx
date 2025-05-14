import { useNavigate } from "react-router-dom";
import { createDosette } from "../services/api";
import FormulaireDosette from "../components/FormulaireDosette";
import { useState } from "react";

export default function NouvelleDosette() {
  const navigate = useNavigate();
  const [erreur, setErreur] = useState(null);

  const handleAjouter = async (data) => {
    try {
      await createDosette(data);
      navigate("/admin");
    } catch (error) {
      console.error(error);
      setErreur("Erreur lors de l'ajout de la dosette.");
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "1rem", color: "var(--accent-color)" }}>
        Nouvelle Dosette
      </h1>

      {erreur && <p style={{ color: "red", textAlign: "center" }}>{erreur}</p>}

      <FormulaireDosette onSubmit={handleAjouter} />
    </div>
  );
}
