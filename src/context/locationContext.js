import React from 'react';

const BuildingContext = React.createContext({});

export const BuildingProvider = ({children}) => {
  return <BuildingContext.Provider>{children}</BuildingContext.Provider>;
};
