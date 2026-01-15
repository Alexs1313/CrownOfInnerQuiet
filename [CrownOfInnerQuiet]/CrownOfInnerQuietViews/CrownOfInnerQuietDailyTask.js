import React, { useRef, useEffect, useState } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Local imports
import CrownOfInnerQuietLayout from '../CrownOfInnerQuietComponents/CrownOfInnerQuietLayout';
import CrownButton from '../CrownOfInnerQuietComponents/CrownButton';
import { setTodayProgress } from '../CrownOfInnerQuietUtils/progress';
import { crownOfInnerQuiteTasks } from '../CrownOfInnerQuietData/crownOfInnerQuiteTasks';

const msPerDay = 24 * 60 * 60 * 1000;
const boldF = 'Montserrat-Bold';
const mediumF = 'Montserrat-Medium';
const primaryWhite = '#FFFFFF';
const secondaryWhite = '#FFFFFFCC';

const CrownOfInnerQuietDailyTask = ({ route }) => {
  const navigation = useNavigation();
  const { crownNickname } = route.params ?? {};
  const intervalRef = useRef(null);

  const [seconds, setSeconds] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);
  const [showCompletedScreen, setShowCompletedScreen] = useState(false);

  const backAnim = useRef(new Animated.Value(0)).current;
  const imgAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const quoteAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

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

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            setIsRunning(false);
            setTimerFinished(true);
            setSeconds(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

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

  const currentDayNumber = Math.floor(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) / msPerDay,
  );

  const currentTaskIndex = currentDayNumber % crownOfInnerQuiteTasks.length;
  const todaysTask = crownOfInnerQuiteTasks[currentTaskIndex];

  const formattedCrownTime = seconds => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const crownSeconds = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${crownSeconds}`;
  };

  const handleStart = () => {
    if (timerFinished) {
      return;
    }
    if (!isRunning) {
      setIsRunning(true);
      if (seconds === 0) {
        setSeconds(60);
        setTimerFinished(false);
      }
    }
  };

  const handleDone = async () => {
    if (!timerFinished) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);

    try {
      await setTodayProgress(1);
    } catch (e) {
      console.warn('Failed to set progress', e);
    }

    setShowCompletedScreen(true);
  };

  if (showCompletedScreen) {
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
              onPress={() => navigation.popToTop()}
              hitSlop={8}
              style={({ pressed }) => [pressed && styles.ispressed]}
            >
              <Image source={require('../../assets/imgs/goBackBtn.png')} />
            </Pressable>
          </Animated.View>
          <Animated.View
            style={[animatedCrownBoxStyle(imgAnim, 28), styles.crownWrap]}
          >
            <Image source={require('../../assets/imgs/nicknameimg.png')} />
          </Animated.View>

          <View
            style={{
              alignItems: 'center',
              width: '100%',
              marginTop: 28,
            }}
          >
            <Text style={styles.completedTitle}>
              Great, you've completed your assignments for today.
            </Text>

            <View style={{ marginTop: 44, width: '100%' }}>
              <CrownButton
                propsLabel={'Go to meditation'}
                propsOnPress={() =>
                  navigation.navigate('CrownOfInnerQuietMeditation', {
                    crownNickname,
                  })
                }
                buttonW={'100%'}
                buttonH={67}
              />
            </View>
          </View>
        </View>
      </CrownOfInnerQuietLayout>
    );
  }

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
            onPress={() => navigation.popToTop()}
            hitSlop={8}
            style={({ pressed }) => [pressed && styles.ispressed]}
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
          <Text style={styles.crownLabel}>Daily task</Text>

          <Animated.View
            style={[animatedCrownBoxStyle(quoteAnim, 16), styles.crownTextBox]}
          >
            <Text style={styles.taskText}>{todaysTask}</Text>
          </Animated.View>

          <View style={{ marginTop: 18, width: '100%' }}>
            {!isRunning && !timerFinished ? (
              <CrownButton
                propsLabel={'Start task'}
                propsOnPress={handleStart}
                buttonW={'100%'}
                buttonH={67}
              />
            ) : (
              <CrownButton
                propsLabel={formattedCrownTime(seconds)}
                propsOnPress={() => {}}
                buttonW={'100%'}
                buttonH={67}
                btnColor={'#EED8A3'}
              />
            )}
          </View>

          <View style={{ marginTop: 10, width: '100%' }}>
            <CrownButton
              propsLabel={'Done'}
              propsOnPress={handleDone}
              isDisabled={!timerFinished}
              buttonW={'100%'}
              buttonH={67}
            />
          </View>
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
    fontSize: 22,
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
  taskText: {
    fontSize: 20,
    fontFamily: boldF,
    color: '#000',
    textAlign: 'center',
    lineHeight: 26,
  },
  completedTitle: {
    fontSize: 22,
    fontFamily: boldF,
    color: primaryWhite,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  quoteLabel: {
    marginTop: 8,
    fontSize: 14,
    color: secondaryWhite,
    textAlign: 'center',
  },
  quoteText: {
    marginTop: 6,
    fontSize: 14,
    color: secondaryWhite,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  resetText: {
    color: secondaryWhite,
    fontSize: 13,
  },
});

export default CrownOfInnerQuietDailyTask;
