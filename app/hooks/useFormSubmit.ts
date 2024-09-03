import { useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useFormSubmit = <T,>() => {
  const router = useRouter();
  return useCallback(
    async (url: string, data: T) => {
      try {
        await axios.patch(url, data);

        router.replace('/profile');
        router.refresh()
      } catch (error) {
        console.log("Error updating data", error);
      }
    },
    [router]
  );
};
