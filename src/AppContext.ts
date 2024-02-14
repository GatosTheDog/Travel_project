// AppContext.tsx
import React from 'react';

type AppContextState = {
  data: any; // Replace 'any' with the type of data you expect
  loading: boolean;
};

export const AppContext = React.createContext<AppContextState | undefined>(undefined);
