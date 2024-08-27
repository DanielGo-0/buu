// services/sheetService.js
import axios from "axios";

const API_BASE_URL = "https://zapas-back.vercel.app/api";

export interface types {
  tabName: string;
  range: string;
  values: string[];
  rangeToUpdate: string;
}

export const fetchData = async (tabName: types, range: types) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sheet-data`, {
      params: { tabName, range },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Google Sheets data:", error);
    throw error;
  }
};

export const updateData = async (
  tabName: types,
  range: types,
  values: types
) => {
  try {
    await axios.post(`${API_BASE_URL}/update-sheet-data`, {
      tabName,
      range,
      values,
    });
  } catch (error) {
    console.error("Error adding data to Google Sheets:", error);
    throw error;
  }
};

export const clearRange = async (tabName: types, range: types) => {
  try {
    await axios.post(`${API_BASE_URL}/clear-range`, {
      tabName,
      range,
    });
  } catch (error) {
    console.error("Error clearing range in Google Sheets:", error);
    throw error;
  }
};
