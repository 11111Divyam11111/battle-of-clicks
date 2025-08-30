
import axios from "axios";

const API_BASE_URL = "http://localhost:4001"; // Click service root

export const recordClick = async (team) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/click`, { team }, {
      headers: { "Content-Type": "application/json" }
    });
    return res.data;
  } catch (err) {
    console.error("Error recording click:", err);
    throw err;
  }
};

export const getScore = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/score`);
    return res.data;
  } catch (err) {
    console.error("Error fetching score:", err);
    throw err;
  }
};
