import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDosette, updateDosette } from "../services/api";
import FormulaireDosette from "../components/FormulaireDosette";

export default function ModifierDosette() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dosette, setDosette] = useState(null);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    getDosette(id)
      .then(setDosette)
      .catch((err) => {
        console.error(err);
        setErreur("Impossible de charger les données.");
      });
  }, [id]);

  const handleModifier = async (data) => {
    try {
      await updateDosette(id, data);
      navigate("/admin");
    } catch (err) {
      console.error(err);
      setErreur("Erreur lors de la modification.");
    }
  };

  if (erreur) return <p style={{ color: "red", textAlign: "center" }}>{erreur}</p>;

  if (!dosette) return <p style={{ textAlign: "center" }}>Chargement en cours...</p>;

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "1rem", color: "var(--accent-color)" }}>
        Modifier une Dosette
      </h1>

      <FormulaireDosette initialData={dosette} onSubmit={handleModifier} />
    </div>
  );
}
