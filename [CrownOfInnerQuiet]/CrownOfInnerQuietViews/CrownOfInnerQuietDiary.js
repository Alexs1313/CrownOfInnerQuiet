import React, { useRef, useEffect } from 'react';
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
import { useNavigation } from '@react-navigation/native';

// Local imports
import CrownOfInnerQuietLayout from '../CrownOfInnerQuietComponents/CrownOfInnerQuietLayout';
import CrownButton from '../CrownOfInnerQuietComponents/CrownButton';
import { useStorage } from '../CrownOfInnerQuietStorage/crownOfInnerQuietContext';

const CrownOfInnerQuietDiary = () => {
  const navigation = useNavigation();
  const { note, setNote, saveNoteWithDate } = useStorage();

  const backButtonAnim = useRef(new Animated.Value(0)).current;
  const imgAnimation = useRef(new Animated.Value(0)).current;
  const titleAnimation = useRef(new Animated.Value(0)).current;
  const quoteAnimation = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const duration = 380;
    const crownnStagger = 90;

    Animated.stagger(crownnStagger, [
      Animated.timing(backButtonAnim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(imgAnimation, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(titleAnimation, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(quoteAnimation, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [
    backButtonAnim,
    imgAnimation,
    titleAnimation,
    quoteAnimation,
    buttonAnimation,
  ]);

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
            style={[animatedCrownBoxStyle(imgAnimation, 28), styles.crownWrap]}
          >
            <Image source={require('../../assets/imgs/nicknameimg.png')} />
          </Animated.View>

          <Animated.View
            style={[
              animatedCrownBoxStyle(titleAnimation, 20),
              { alignItems: 'center', width: '100%' },
            ]}
          >
            <Text style={styles.crownLabel}>Diary</Text>
            <Text style={styles.subtitle}>Describe your feelings</Text>

            <Animated.View
              style={[
                animatedCrownBoxStyle(quoteAnimation, 16),
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
                propsOnPress={() => {
                  saveNoteWithDate();
                  navigation.popToTop();
                }}
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
