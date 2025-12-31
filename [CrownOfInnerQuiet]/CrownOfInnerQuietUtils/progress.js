import AsyncStorage from '@react-native-async-storage/async-storage';

export const formattedCrownDate = (day = new Date()) => {
  const currentDay = String(day.getDate()).padStart(2, '0');

  const currentMonth = String(day.getMonth() + 1).padStart(2, '0');

  const currentYear = day.getFullYear();

  return `${currentDay}/${currentMonth}/${currentYear}`;
};

export const getTodayProgress = async () => {
  try {
    const progress = await AsyncStorage.getItem('crown_progress');
    if (!progress) return { date: formattedCrownDate(), step: 0 };
    const parsedJSON = JSON.parse(progress);
    const isToday = formattedCrownDate();
    if (parsedJSON?.date === isToday && typeof parsedJSON.step === 'number') {
      return parsedJSON;
    }
    return { date: isToday, step: 0 };
  } catch (e) {
    console.warn('error', e);
    return { date: formattedCrownDate(), step: 0 };
  }
};

export const setTodayProgress = async crownStep => {
  try {
    const crownEntry = { date: formattedCrownDate(), step: crownStep };

    await AsyncStorage.setItem('crown_progress', JSON.stringify(crownEntry));

    return crownEntry;
  } catch (e) {
    console.warn('setTodayProgress error', e);

    throw e;
  }
};

export const clearProgress = async () => {
  try {
    await AsyncStorage.removeItem('crown_progress');
  } catch (e) {
    console.warn('clearProgress error', e);
  }
};
