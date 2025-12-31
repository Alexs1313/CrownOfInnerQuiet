import React, { useRef, useEffect, useState } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// Local imports
import CrownOfInnerQuietLayout from '../CrownOfInnerQuietComponents/CrownOfInnerQuietLayout';
import CrownButton from '../CrownOfInnerQuietComponents/CrownButton';

const CrownOfInnerQuietDiary = () => {
  const navigation = useNavigation();
  const [note, setNote] = useState('');

  const backButtonAnim = useRef(new Animated.Value(0)).current;
  const imgAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const quoteAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const duration = 380;
    const crownnStagger = 90;

    Animated.stagger(crownnStagger, [
      Animated.timing(backButtonAnim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(imgAnim, { toValue: 1, duration, useNativeDriver: true }),
      Animated.timing(titleAnim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(quoteAnim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [backButtonAnim, imgAnim, titleAnim, quoteAnim, buttonAnim]);

  const animatedCrownBoxStyle = (animValue, offset = 18) => ({
    opacity: animValue,
    transform: [
      {
        translateY: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [offset, 0],
        }),
      },
      {
        scale: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.98, 1],
        }),
      },
    ],
  });

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

      await AsyncStorage.setItem(
        'crown_diary_entries',
        JSON.stringify(isExisting),
      );

      setNote('');

      navigation.popToTop();
    } catch (e) {
      console.warn('Error saving:', e);
    }
  };

  return (
    <CrownOfInnerQuietLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.crownBox}>
          <Animated.View
            style={[
              animatedCrownBoxStyle(backButtonAnim, 6),
              { alignSelf: 'flex-start', marginBottom: 10 },
            ]}
          >
            <Pressable
              onPress={() => navigation.popToTop()}
              style={({ pressed }) => [pressed && styles.ispressed]}
              hitSlop={8}
            >
              <Image source={require('../../assets/imgs/goBackBtn.png')} />
            </Pressable>
          </Animated.View>

          <Animated.View
            style={[animatedCrownBoxStyle(imgAnim, 28), styles.crownWrap]}
          >
            <Image source={require('../../assets/imgs/nicknameimg.png')} />
          </Animated.View>

          <Animated.View
            style={[
              animatedCrownBoxStyle(titleAnim, 20),
              { alignItems: 'center', width: '100%' },
            ]}
          >
            <Text style={styles.crownLabel}>Diary</Text>
            <Text style={styles.subtitle}>Describe your feelings</Text>

            <Animated.View
              style={[
                animatedCrownBoxStyle(quoteAnim, 16),
                styles.crownTextBox,
              ]}
            >
              <TextInput
                value={note}
                onChangeText={setNote}
                placeholder="Describe your feelings"
                placeholderTextColor="#4C4C4C"
                style={styles.diaryInput}
                multiline
                maxLength={70}
                textAlignVertical="top"
                accessibilityLabel="Diary input"
              />
            </Animated.View>

            <View style={{ marginTop: 18, width: '100%' }}>
              <CrownButton
                propsLabel={'Save'}
                propsOnPress={saveNoteWithDate}
                isDisabled={!note.trim()}
                buttonW={'100%'}
                buttonH={67}
                btnColor={note.trim() ? '#93C2FA' : '#49607C'}
              />
            </View>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </CrownOfInnerQuietLayout>
  );
};

const styles = StyleSheet.create({
  crownBox: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 70,
    padding: 30,
  },
  ispressed: {
    transform: [{ translateY: 2 }],
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
  },
  crownWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  crownTextBox: {
    marginTop: 20,
    backgroundColor: '#D6C08D',
    width: '100%',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
  },
  crownLabel: {
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 6,
    marginTop: 15,
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    color: '#FFFFFF',
    marginTop: 6,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
  },
  diaryInput: {
    backgroundColor: '#D6C08D',
    width: '100%',
    minHeight: 100,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: '#0B1020',
  },
});

export default CrownOfInnerQuietDiary;
