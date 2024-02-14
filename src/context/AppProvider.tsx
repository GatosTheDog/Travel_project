// AppProvider.tsx
import React, { useState, useEffect, FC } from 'react';
import { AppContext } from '../AppContext';
import { fetchData } from '../api/fetchData'; // Your fetch function

// Define the type for the props of the AppProvider, if any
type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <AppContext.Provider value={{ data, loading }}>
      {children}
    </AppContext.Provider>
  );
};
