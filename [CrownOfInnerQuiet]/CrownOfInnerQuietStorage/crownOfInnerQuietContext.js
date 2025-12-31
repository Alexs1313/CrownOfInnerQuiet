import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useState } from 'react';

export const StoreContext = createContext(undefined);

export const useStorage = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);

  const loadCrownNotes = useCallback(async () => {
    try {
      const savedNotes = await AsyncStorage.getItem('crown_diary_entries');

      const parsedJSONNotes = savedNotes ? JSON.parse(savedNotes) : [];

      const reversed = parsedJSONNotes.slice().reverse();
      setEntries(reversed);
    } catch (e) {
      console.warn('failed ❌', e);
    }
  }, []);

  const contextValues = {
    loadCrownNotes,
    entries,
    setEntries,
  };

  return (
    <StoreContext.Provider value={contextValues}>
      {children}
    </StoreContext.Provider>
  );
};
