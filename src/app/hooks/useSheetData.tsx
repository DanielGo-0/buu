// hooks/useSheetData.js
import { useState, useEffect } from "react";
import { fetchData, updateData, clearRange } from "../services/sheetService";
import { types } from "../services/sheetService";

export const useSheetData = (tabName: types, range: types) => {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchData(tabName, range);
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, [tabName, range]);

  const handleChange = (index: number, value: string) => {
    const updatedData = [...newData];
    updatedData[index] = value;
    setNewData(updatedData);
  };

  const handleSubmit = async () => {
    try {
      const nextRow = data.length + 1;
      const rangeToUpdate = `A${nextRow}:Z${nextRow}`;
      await updateData(tabName, rangeToUpdate as any, [newData] as any);
      setNewData(["", "", "", ""]);
      setErrors([]);
      const updatedData = await fetchData(tabName, range);
      setData(updatedData);
    } catch (error) {
      setErrors(["Failed to submit data"] as any);
    }
  };

  const handleClearRange = async (rangeToClear: string) => {
    try {
      await clearRange(tabName, rangeToClear as any);
      const updatedData = await fetchData(tabName, range);
      setData(updatedData);
    } catch (error) {
      setErrors(["Failed to clear range"] as any);
    }
  };

  return {
    data,
    newData,
    errors,
    handleChange,
    handleSubmit,
    handleClearRange,
  };
};
