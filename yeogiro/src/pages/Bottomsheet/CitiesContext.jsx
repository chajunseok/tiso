import React, {createContext, useContext, useState} from 'react';

const CitiesContext = createContext();

export const CitiesProvider = ({children}) => {
  const [addedCities, setAddedCities] = useState([]);

  const addCity = city => {
    if (!addedCities.includes(city)) {
      setAddedCities(prevCities => [...prevCities, city]);
    }
  };

  const removeCity = city => {
    setAddedCities(prevCities => prevCities.filter(c => c !== city));
  };

  return (
    <CitiesContext.Provider value={{addedCities, addCity, removeCity}}>
      {children}
    </CitiesContext.Provider>
  );
};

export const useCities = () => useContext(CitiesContext);
