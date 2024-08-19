import { useCallback } from "react";
import axios from "axios";

export const useFormSubmit = <T,>() => {
  return useCallback(
    async (url: string, data: T) => {
      try {
        const res = await axios.patch(url, data);
        console.log("Data submitted successfully", res);
      } catch (error) {
        console.log("Error updating data", error);
      }
    },
    []
  );
};
