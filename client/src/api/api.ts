import axios from "axios";

export const fetchUser = async (username: string) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/api/fetchUser`,
        {
          params: { username },
        }
      );
      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };