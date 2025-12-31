import React, { useState, useRef, useEffect } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Local imports
import CrownOfInnerQuietLayout from '../CrownOfInnerQuietComponents/CrownOfInnerQuietLayout';
import CrownButton from '../CrownOfInnerQuietComponents/CrownButton';
import CrownPagination from '../CrownOfInnerQuietComponents/CrownPagination';

const crownIntroData = [
  {
    crwnimage: require('../../assets/imgs/onboard1.png'),
    crwnbutton: 'Start',
    crwnlabel: `A Moment of Silence
 Every Day`,
    crwnsubtitle:
      'A calm daily ritual to reconnect with yourself. One quote. One task. One quiet breath.',
  },
  {
    crwnimage: require('../../assets/imgs/onboard2.png'),
    crwnbutton: 'Next',
    crwnlabel: 'Your Daily Ritual',
    crwnsubtitle:
      'Every day you receive: • a quote for reflection • a small mindful task • a short meditation with gentle sound',
  },
  {
    crwnimage: require('../../assets/imgs/onboard3.png'),
    crwnbutton: 'Next',
    crwnlabel: `Inner Strength Lives
in Silence`,
    crwnsubtitle:
      'Crown of Inner Quiet is not about control. It’s about awareness, calm, and clarity.',
  },
];

const CrownOfInnerQuietOnboarding = () => {
  const [crownCurrentStep, setCrownCurrentStep] = useState(0);
  const navigation = useNavigation();

  const imgAnim = useRef(new Animated.Value(0)).current;
  const labelAnim = useRef(new Animated.Value(0)).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;
  const paginationAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    imgAnim.setValue(0);
    labelAnim.setValue(0);
    subtitleAnim.setValue(0);

    Animated.stagger(90, [
      Animated.timing(imgAnim, {
        toValue: 1,
        duration: 360,
        useNativeDriver: true,
      }),
      Animated.timing(labelAnim, {
        toValue: 1,
        duration: 360,
        useNativeDriver: true,
      }),
      Animated.timing(subtitleAnim, {
        toValue: 1,
        duration: 360,
        useNativeDriver: true,
      }),
    ]).start();
  }, [crownCurrentStep]);

  useEffect(() => {
    Animated.stagger(120, [
      Animated.timing(imgAnim, {
        toValue: 1,
        duration: 420,
        useNativeDriver: true,
      }),
      Animated.timing(labelAnim, {
        toValue: 1,
        duration: 420,
        useNativeDriver: true,
      }),
      Animated.timing(subtitleAnim, {
        toValue: 1,
        duration: 420,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 420,
        useNativeDriver: true,
      }),
      Animated.timing(paginationAnim, {
        toValue: 1,
        duration: 420,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    const duration = 420;
    const crownStagger = 120;
    Animated.stagger(crownStagger, [
      Animated.timing(imgAnim, { toValue: 1, duration, useNativeDriver: true }),
      Animated.timing(labelAnim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(subtitleAnim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(paginationAnim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [imgAnim, labelAnim, subtitleAnim, buttonAnim, paginationAnim]);

  const animatedStyle = (animValue, offset = 14) => ({
    opacity: animValue,
    transform: [
      {
        translateY: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [offset, 0],
        }),
      },
    ],
  });

  const handleNextPress = () => {
    crownCurrentStep < 2
      ? setCrownCurrentStep(crownCurrentStep + 1)
      : navigation.replace('CrownOfInnerQuietSetNickname');
  };

  return (
    <CrownOfInnerQuietLayout>
      <View style={styles.crownBox}>
        <Animated.View style={[animatedStyle(imgAnim, 28), styles.centerItem]}>
          <Image source={crownIntroData[crownCurrentStep].crwnimage} />
        </Animated.View>

        <View style={{ bottom: 150, alignItems: 'center' }}>
          <Animated.View
            style={[animatedStyle(labelAnim, 20), styles.crownTextBox]}
          >
            <Text style={styles.crownLabel}>
              {crownIntroData[crownCurrentStep].crwnlabel}
            </Text>
            <Animated.Text
              style={[styles.crownSubtitle, { opacity: subtitleAnim }]}
              allowFontScaling={true}
              adjustsFontSizeToFit={Platform.OS === 'ios'}
            >
              {crownIntroData[crownCurrentStep]?.crwnsubtitle}
            </Animated.Text>
          </Animated.View>

          <Animated.View
            style={[animatedStyle(buttonAnim, 12), { marginTop: 18 }]}
          >
            <CrownButton
              propsLabel={crownIntroData[crownCurrentStep].crwnbutton}
              propsOnPress={handleNextPress}
            />
          </Animated.View>

          <Animated.View
            style={[animatedStyle(paginationAnim, 8), { marginTop: 18 }]}
          >
            <CrownPagination crownCurrentStep={crownCurrentStep} />
          </Animated.View>
        </View>
      </View>
    </CrownOfInnerQuietLayout>
  );
};

const styles = StyleSheet.create({
  crownBox: {
    flex: 1,
    alignItems: 'center',
  },
  centerItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  crownTextBox: {
    marginTop: 20,
    backgroundColor: '#D6C08D',
    width: '90%',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  crownLabel: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 10,
    color: '#0B1020',
    textAlign: 'center',
  },
  crownSubtitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    color: '#0B1020',
    textAlign: 'center',
  },
  crownPaginationDot: {
    width: 40,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#FFFFFF4D',
  },
  crownPagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    gap: 5,
  },
});

export default CrownOfInnerQuietOnboarding;
