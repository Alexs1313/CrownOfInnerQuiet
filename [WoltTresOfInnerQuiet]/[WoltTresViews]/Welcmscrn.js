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
import CrownOfInnerQuietLayout from '../[InnerQuietComponents]/CrownOfInnerQuietLayout';
import CrownButton from '../[InnerQuietComponents]/CrownButton';
import { crownOfInnerQuietQuotes } from '../[WoltTresData]/crownOfInnerQuietQuotes';
import { getTodayProgress } from '../[TresUtils]/progress';

const msPerDay = 24 * 60 * 60 * 1000;
const boldF = 'Montserrat-Bold';
const mediumF = 'Montserrat-Medium';
const primaryWhite = '#FFFFFF';
const secondaryWhite = '#FFFFFFCC';

const Welcmscrn = ({ route }) => {
  const navigation = useNavigation();
  const { crownNickname } = route.params ?? '';
  const [completedSteps, setCompletedSteps] = useState(0);

  const backAnimation = useRef(new Animated.Value(0)).current;
  const imgAnimation = useRef(new Animated.Value(0)).current;
  const titleAnimation = useRef(new Animated.Value(0)).current;
  const quoteAnimation = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;
  const activePulse = useRef(new Animated.Value(0)).current;
  const activeStepBounce = useRef(new Animated.Value(1)).current;
  const activePulseLoopRef = useRef(null);
  const prevCompletedStepsRef = useRef(null);

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
      Animated.timing(backAnimation, {
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
    backAnimation,
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

  const today = new Date();

  const crownDayNumber = Math.floor(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) / msPerDay,
  );

  const currentQuoteIndex = crownDayNumber % crownOfInnerQuietQuotes.length;

  const todaysCrownQuote = crownOfInnerQuietQuotes[currentQuoteIndex];

  const activeStep = Math.min(completedSteps + 1, 3);
  const activeStepScale = activePulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.015],
  });
  const activeCombinedScale = Animated.multiply(
    activeStepScale,
    activeStepBounce,
  );

  useEffect(() => {
    if (activePulseLoopRef.current) {
      activePulseLoopRef.current.stop();
      activePulseLoopRef.current = null;
    }

    activePulse.setValue(0);
    activePulseLoopRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(activePulse, {
          toValue: 1,
          duration: 1400,
          useNativeDriver: true,
        }),
        Animated.timing(activePulse, {
          toValue: 0,
          duration: 1400,
          useNativeDriver: true,
        }),
      ]),
    );
    activePulseLoopRef.current.start();

    return () => {
      if (activePulseLoopRef.current) {
        activePulseLoopRef.current.stop();
        activePulseLoopRef.current = null;
      }
      activePulse.setValue(0);
    };
  }, [activeStep, activePulse]);

  useEffect(() => {
    const prevCompleted = prevCompletedStepsRef.current;
    if (prevCompleted !== null && prevCompleted !== completedSteps) {
      activeStepBounce.setValue(1);
      Animated.sequence([
        Animated.spring(activeStepBounce, {
          toValue: 1.05,
          friction: 5,
          tension: 130,
          useNativeDriver: true,
        }),
        Animated.spring(activeStepBounce, {
          toValue: 1,
          friction: 6,
          tension: 110,
          useNativeDriver: true,
        }),
      ]).start();
    }
    prevCompletedStepsRef.current = completedSteps;
  }, [completedSteps, activeStepBounce]);

  const goToCrownSection = stepNumber => {
    if (stepNumber === activeStep) {
      if (stepNumber === 1) navigation.navigate('Dailytsksscrn');
      if (stepNumber === 2) navigation.navigate('Medtationscrn');
      if (stepNumber === 3) navigation.navigate('Diaryscrn');
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
      <Animated.View
        style={{ marginTop: 15, width: '100%' }}
        key={`step-${stepCrownNumber}`}
      >
        <Animated.View
          style={[
            wrapperStyle,
            isButtonActive
              ? { transform: [{ scale: activeCombinedScale }] }
              : null,
          ]}
        >
          <CrownButton
            propsLabel={label}
            buttonW={'100%'}
            buttonH={67}
            isFlexStart
            propsOnPress={() => goToCrownSection(stepCrownNumber)}
            disabled={disabled}
          />
        </Animated.View>
      </Animated.View>
    );
  };

  return (
    <CrownOfInnerQuietLayout>
      <View style={styles.crownBox}>
        <Animated.View
          style={[
            animatedCrownBoxStyle(backAnimation, 6),
            { alignSelf: 'flex-start', marginBottom: 10 },
          ]}
        >
          <Pressable
            onPress={() => navigation.navigate('Notesscrn')}
            hitSlop={8}
            style={({ pressed }) => [pressed && styles.ispressed]}
          >
            <Image source={require('../../assets/imgs/crownnote.png')} />
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
          <Text style={styles.crownLabel}>Good morning, {crownNickname}!</Text>

          <Animated.View
            style={[
              animatedCrownBoxStyle(quoteAnimation, 16),
              styles.crownTextBox,
            ]}
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
    fontFamily: boldF,
    marginBottom: 6,
    marginTop: 10,
    color: primaryWhite,
    textAlign: 'center',
  },
  crownSubtitle: {
    fontSize: 20,
    fontFamily: mediumF,
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
    color: secondaryWhite,
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
    fontFamily: mediumF,
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

export default Welcmscrn;
