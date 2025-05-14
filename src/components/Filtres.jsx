import { useEffect, useState } from "react";
import { fetchMarques, fetchPays } from "../services/api";
import FiltreNombre from "./FiltreNombre";
import FiltreSelect from "./FiltreSelect";
import "../styles/Filtres.css";

export default function Filtres({ onFiltrer }) {
  const [prixMin, setPrixMin] = useState("");
  const [prixMax, setPrixMax] = useState("");
  const [intensiteMin, setIntensiteMin] = useState("");
  const [intensiteMax, setIntensiteMax] = useState("");
  const [marque, setMarque] = useState("");
  const [pays, setPays] = useState("");

  const [marques, setMarques] = useState([]);
  const [paysList, setPaysList] = useState([]);

  useEffect(() => {
    fetchMarques().then(setMarques);
    fetchPays().then(setPaysList);
  }, []);

  const appliquerFiltres = () => {
    const filtres = {};
    if (prixMin) filtres.prixMin = prixMin;
    if (prixMax) filtres.prixMax = prixMax;
    if (intensiteMin) filtres.intensiteMin = intensiteMin;
    if (intensiteMax) filtres.intensiteMax = intensiteMax;
    if (marque) filtres.marque = marque;
    if (pays) filtres.pays = pays;

    onFiltrer(filtres);
  };

  const resetFiltres = () => {
    setPrixMin("");
    setPrixMax("");
    setIntensiteMin("");
    setIntensiteMax("");
    setMarque("");
    setPays("");
    onFiltrer({});
  };

  return (
    <div className="filtres">
      <h2>Filtres</h2>

      <FiltreNombre label="Prix min" id="prix-min" value={prixMin} setValue={setPrixMin} step={0.05} max={prixMax} />
      <FiltreNombre label="Prix max" id="prix-max" value={prixMax} setValue={setPrixMax} step={0.05} min={prixMin} />
      <FiltreNombre label="Intensité min" id="intensite-min" value={intensiteMin} setValue={setIntensiteMin} min={0} max={intensiteMax} />
      <FiltreNombre label="Intensité max" id="intensite-max" value={intensiteMax} setValue={setIntensiteMax} min={intensiteMin} max={10} />

      <FiltreSelect label="Marque" id="marque" value={marque} setValue={setMarque} options={marques} allLabel="Toutes" />
      <FiltreSelect label="Pays" id="pays" value={pays} setValue={setPays} options={paysList} allLabel="Tous" />

      <button onClick={appliquerFiltres}>Appliquer les filtres</button>
      <button style={{ marginLeft: "0.5rem", marginTop: "0.5rem", backgroundColor: "#b58a7d" }} onClick={resetFiltres}>X</button>
    </div>
  );
}
