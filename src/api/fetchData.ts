import { Package } from "../screens/PackagesScreen";

interface ApiResponse {
  data: Package[];
}

export const fetchData = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch('http://localhost:3001/api/proxy');

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("There was an error fetching the data", error);
    throw error;
  }
};
