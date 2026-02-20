import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useState } from 'react';

export const StoreContext = createContext(undefined);

export const useStorage = () => {
  return useContext(StoreContext);
};

export const ContextRoot = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [note, setNote] = useState('');

  const loadCrownNotes = useCallback(async () => {
    try {
      const savedNotes = await AsyncStorage.getItem('crown_diary_entries');

      const parsedJSONNotes = savedNotes ? JSON.parse(savedNotes) : [];

      const reversed = parsedJSONNotes.slice().reverse();
      setEntries(reversed);
    } catch (e) {
      console.warn('failed', e);
    }
  }, []);

  const formatatedDate = (day = new Date()) => {
    const crownDay = String(day.getDate()).padStart(2, '0');

    const crownMonth = String(day.getMonth() + 1).padStart(2, '0');

    const crownYear = day.getFullYear();

    return `${crownDay}/${crownMonth}/${crownYear}`;
  };

  const saveNoteWithDate = async () => {
    try {
      const entryCrownObj = {
        note: note.trim(),
        date: formatatedDate(),
      };

      const saved = await AsyncStorage.getItem('crown_diary_entries');
      const isExisting = saved ? JSON.parse(saved) : [];

      isExisting.push(entryCrownObj);

      console.log('is saved!!');

      await AsyncStorage.setItem(
        'crown_diary_entries',
        JSON.stringify(isExisting),
      );

      setNote('');
    } catch (e) {
      console.warn('Error saving Note', e);
    }
  };

  const contextValues = {
    loadCrownNotes,
    entries,
    setEntries,
    note,
    setNote,
    saveNoteWithDate,
  };

  return (
    <StoreContext.Provider value={contextValues}>
      {children}
    </StoreContext.Provider>
  );
};
