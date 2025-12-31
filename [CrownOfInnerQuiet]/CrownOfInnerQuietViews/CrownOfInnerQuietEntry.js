import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

// Local imports
import CrownOfInnerQuietLayout from '../CrownOfInnerQuietComponents/CrownOfInnerQuietLayout';
import CrownButton from '../CrownOfInnerQuietComponents/CrownButton';
import { crownOfInnerQuietQuotes } from '../CrownOfInnerQuietData/crownOfInnerQuietQuotes';
import { getTodayProgress } from '../CrownOfInnerQuietUtils/progress';

const msPerDay = 24 * 60 * 60 * 1000;

const CrownOfInnerQuietEntry = ({ route }) => {
  const navigation = useNavigation();
  const { crownNickname } = route.params ?? '';
  const [completedSteps, setCompletedSteps] = useState(0);

  const backAnim = useRef(new Animated.Value(0)).current;
  const imgAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const quoteAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      (async () => {
        const todayCrownProgress = await getTodayProgress();

        if (!isMounted) return;

        setCompletedSteps(
          typeof todayCrownProgress.step === 'number'
            ? todayCrownProgress.step
            : 0,
        );
      })();

      return () => {
        isMounted = false;
      };
    }, []),
  );

  useEffect(() => {
    const duration = 380;

    const crownStagger = 90;
    Animated.stagger(crownStagger, [
      Animated.timing(backAnim, {
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
  }, [backAnim, imgAnim, titleAnim, quoteAnim, buttonAnim]);

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

  const today = new Date();

  const crownDayNumber = Math.floor(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) / msPerDay,
  );

  const currentQuoteIndex = crownDayNumber % crownOfInnerQuietQuotes.length;

  const todaysCrownQuote = crownOfInnerQuietQuotes[currentQuoteIndex];

  const activeStep = Math.min(completedSteps + 1, 3);

  const goToCrownSection = stepNumber => {
    if (stepNumber === activeStep) {
      if (stepNumber === 1) navigation.navigate('CrownOfInnerQuietDailyTask');
      if (stepNumber === 2) navigation.navigate('CrownOfInnerQuietMeditation');
      if (stepNumber === 3) navigation.navigate('CrownOfInnerQuietDiary');
    }
  };

  const renderStepButton = (idx, label) => {
    const stepCrownNumber = idx + 1;
    const isButtonActive = activeStep === stepCrownNumber;
    const isCompletedTask = completedSteps >= stepCrownNumber;

    const disabled = !isButtonActive;

    const wrapperStyle = [
      styles.stepWrapper,
      isButtonActive ? styles.stepActive : null,
      isCompletedTask && !isButtonActive ? styles.stepCompleted : null,
      disabled ? styles.stepLocked : null,
    ];

    return (
      <View
        style={{ marginTop: 15, width: '100%' }}
        key={`step-${stepCrownNumber}`}
      >
        <View style={wrapperStyle}>
          <CrownButton
            propsLabel={label}
            buttonW={'100%'}
            buttonH={67}
            isFlexStart
            propsOnPress={() => goToCrownSection(stepCrownNumber)}
            disabled={disabled}
          />
        </View>
      </View>
    );
  };

  return (
    <CrownOfInnerQuietLayout>
      <View style={styles.crownBox}>
        <Animated.View
          style={[
            animatedCrownBoxStyle(backAnim, 6),
            { alignSelf: 'flex-start', marginBottom: 10 },
          ]}
        >
          <Pressable
            onPress={() => navigation.navigate('CrownOfInnerQuietNotes')}
            hitSlop={8}
            style={({ pressed }) => [pressed && styles.ispressed]}
          >
            <Image source={require('../../assets/imgs/crownnote.png')} />
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
          <Text style={styles.crownLabel}>Good morning, {crownNickname}!</Text>

          <Animated.View
            style={[animatedCrownBoxStyle(quoteAnim, 16), styles.crownTextBox]}
          >
            <Text style={styles.crownLabel}>Quote of the day:</Text>
            <Animated.Text
              style={[styles.crownSubtitle]}
              allowFontScaling={true}
              adjustsFontSizeToFit={Platform.OS === 'ios'}
            >
              {todaysCrownQuote}
            </Animated.Text>
          </Animated.View>

          {renderStepButton(0, '1    Your task for today')}
          {renderStepButton(1, '2   Go to meditation')}
          {renderStepButton(2, '3   To the diary')}
        </Animated.View>
      </View>
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
    padding: 24,
    alignItems: 'center',
  },
  crownLabel: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 6,
    marginTop: 10,
    color: '#fff',
    textAlign: 'center',
  },
  crownSubtitle: {
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    color: '#0B1020',
    textAlign: 'center',
    marginTop: 6,
  },
  activePreviewWrapper: {
    marginTop: 18,
    width: '100%',
    alignItems: 'center',
  },
  activeLabel: {
    color: '#FFFFFF99',
    fontSize: 13,
    marginBottom: 8,
  },
  activeBox: {
    width: '100%',
    backgroundColor: '#EED8A3',
    borderRadius: 16,
    padding: 16,
    minHeight: 72,
    justifyContent: 'center',
  },
  activeText: {
    color: '#0B1020',
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
  stepWrapper: {
    position: 'relative',
  },
  stepActive: {
    shadowColor: '#9FC7FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 8,
    elevation: 6,
  },
  stepCompleted: {
    opacity: 0.85,
  },
  stepLocked: {
    opacity: 0.5,
  },
  checkMark: {
    position: 'absolute',
    right: 16,
    top: 12,
    backgroundColor: 'transparent',
  },
  checkMarkText: {
    fontSize: 18,
    color: '#0B1020',
    fontWeight: '700',
  },
});

export default CrownOfInnerQuietEntry;
