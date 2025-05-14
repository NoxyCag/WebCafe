import axios from "axios";

const API_BASE_URL = "http://172.17.0.59:9000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function fetchMarques() {
  const response = await api.get("/marques");
  return response.data;
}

export async function fetchPays() {
  const response = await api.get("/pays");
  return response.data;
}

export async function fetchDosettesAvecFiltres(filtres = {}) {
  const params = new URLSearchParams(filtres).toString();
  const response = await api.get(`/dosettes?${params.toString()}`);
  return response.data;
}

export async function verifierToken() {
  try {
    const response = await api.get("/checktoken", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.valid; // true ou false
  } catch (error) {
    return false;
  }
}

export async function deleteDosette(id) {
  const response = await api.delete(`/dosettes/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
}

export async function createDosette(data) {
  const response = await api.post("/dosettes", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}

export async function updateDosette(id, data) {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `http://172.17.0.59:9000/api/dosettes/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  return response.data;
}

export async function getDosette(id) {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `http://172.17.0.59:9000/api/dosettes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  return response.data;
}

export default api;