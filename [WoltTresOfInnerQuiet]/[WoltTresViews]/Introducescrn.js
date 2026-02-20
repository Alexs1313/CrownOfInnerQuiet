import React, { useState, useRef, useEffect } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
  Platform,
  Easing,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Local imports
import CrownOfInnerQuietLayout from '../[InnerQuietComponents]/CrownOfInnerQuietLayout';
import CrownButton from '../[InnerQuietComponents]/CrownButton';
import CrownPagination from '../[InnerQuietComponents]/CrownPagination';

const boldF = 'Montserrat-Bold';
const mediumF = 'Montserrat-Medium';
const secondaryWhite = '#FFFFFFCC';

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
      'WoltTres: Inner Quiet is not about control. It’s about awareness, calm, and clarity.',
  },
];

const Introducescrn = () => {
  const [crownCurrentStep, setCrownCurrentStep] = useState(0);
  const navigation = useNavigation();

  const entranceProgress = useRef(new Animated.Value(0)).current;
  const entranceAnimRef = useRef(null);

  useEffect(() => {
    if (entranceAnimRef.current) {
      entranceAnimRef.current.stop();
      entranceAnimRef.current = null;
    }

    entranceProgress.setValue(0);
    entranceAnimRef.current = Animated.timing(entranceProgress, {
      toValue: 1,
      duration: 1200,
      easing: Easing.bezier(0.2, 0.85, 0.3, 1),
      useNativeDriver: true,
    });
    entranceAnimRef.current.start(() => {
      entranceAnimRef.current = null;
    });

    return () => {
      if (entranceAnimRef.current) {
        entranceAnimRef.current.stop();
        entranceAnimRef.current = null;
      }
    };
  }, [crownCurrentStep, entranceProgress]);

  const animatedStyle = (
    start,
    end,
    offset = 14,
    withScale = false,
    minOpacity = 0.12,
  ) => ({
    opacity: entranceProgress.interpolate({
      inputRange: [start, end],
      outputRange: [minOpacity, 1],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        translateY: entranceProgress.interpolate({
          inputRange: [start, end],
          outputRange: [offset, 0],
          extrapolate: 'clamp',
        }),
      },
      ...(withScale
        ? [
            {
              scale: entranceProgress.interpolate({
                inputRange: [start, end],
                outputRange: [0.996, 1],
                extrapolate: 'clamp',
              }),
            },
          ]
        : []),
    ],
  });

  const handleNextPress = () => {
    crownCurrentStep < 2
      ? setCrownCurrentStep(crownCurrentStep + 1)
      : navigation.replace('Nicnmsscrn');
  };

  return (
    <CrownOfInnerQuietLayout>
      <View style={styles.crownBox}>
        <Animated.View
          style={[animatedStyle(0.0, 0.5, 14, true), styles.centerItem]}
        >
          <Image source={crownIntroData[crownCurrentStep].crwnimage} />
        </Animated.View>

        <View style={{ bottom: 150, alignItems: 'center' }}>
          <Animated.View
            style={[animatedStyle(0.1, 0.7, 10), styles.crownTextBox]}
          >
            <Text style={styles.crownLabel}>
              {crownIntroData[crownCurrentStep].crwnlabel}
            </Text>
            <Animated.Text
              style={[
                styles.crownSubtitle,
                animatedStyle(0.16, 0.78, 6, false, 0.12),
              ]}
              allowFontScaling={true}
              adjustsFontSizeToFit={Platform.OS === 'ios'}
            >
              {crownIntroData[crownCurrentStep]?.crwnsubtitle}
            </Animated.Text>
          </Animated.View>

          <Animated.View
            style={[animatedStyle(0.3, 0.9, 4), { marginTop: 18 }]}
          >
            <CrownButton
              propsLabel={crownIntroData[crownCurrentStep].crwnbutton}
              propsOnPress={handleNextPress}
            />
          </Animated.View>

          <Animated.View
            style={[animatedStyle(0.4, 1, 2), { marginTop: 18 }]}
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
    fontFamily: boldF,
    marginBottom: 10,
    color: '#0B1020',
    textAlign: 'center',
  },
  crownSubtitle: {
    fontSize: 18,
    fontFamily: mediumF,
    color: '#0B1020',
    textAlign: 'center',
  },
  crownPaginationDot: {
    width: 40,
    height: 8,
    borderRadius: 5,
    backgroundColor: secondaryWhite,
  },
  crownPagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    gap: 5,
  },
});

export default Introducescrn;
