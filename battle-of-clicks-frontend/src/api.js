// src/api.js
import axios from "axios";

const API_URL = "http://localhost:4001"; // Click service

export const recordClick = async (team) => {
  try {
    const res = await axios.post(`${API_URL}/click`, { team });
    return res.data;
  } catch (err) {
    console.error("Error recording click:", err);
    throw err;
  }
};

export const getScore = async () => {
  try {
    const res = await axios.get(`${API_URL}/score`);
    return res.data;
  } catch (err) {
    console.error("Error fetching score:", err);
    throw err;
  }
};
