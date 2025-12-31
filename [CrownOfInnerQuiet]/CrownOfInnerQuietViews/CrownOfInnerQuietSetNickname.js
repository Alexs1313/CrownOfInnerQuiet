import React, { useState, useRef, useEffect } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Local imports
import CrownOfInnerQuietLayout from '../CrownOfInnerQuietComponents/CrownOfInnerQuietLayout';
import CrownButton from '../CrownOfInnerQuietComponents/CrownButton';

const CrownOfInnerQuietSetNickname = () => {
  const [crownNickname, setCrownNickname] = useState('');
  const navigation = useNavigation();

  const imgAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const inputAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  const animatedStyle = (animValue, offset = 18) => ({
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

  useEffect(() => {
    const duration = 400;
    const crownStagger = 120;

    Animated.stagger(crownStagger, [
      Animated.timing(imgAnim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(titleAnim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(inputAnim, {
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
  }, [imgAnim, titleAnim, inputAnim, buttonAnim]);

  return (
    <CrownOfInnerQuietLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.crownBox}>
          <Animated.View style={[animatedStyle(imgAnim, 28), styles.crownWrap]}>
            <Image source={require('../../assets/imgs/nicknameimg.png')} />
          </Animated.View>

          <Animated.View
            style={[
              animatedStyle(titleAnim, 20),
              { alignItems: 'center', width: '100%' },
            ]}
          >
            <Text style={styles.crownLabel}>Set your nickname:</Text>

            <Animated.View
              style={[
                animatedStyle(inputAnim, 12),
                { width: '100%', alignItems: 'center' },
              ]}
            >
              <TextInput
                style={styles.crownTextBox}
                placeholder="Nickname"
                placeholderTextColor={'#4C4C4C'}
                value={crownNickname}
                onChangeText={setCrownNickname}
                accessibilityLabel="Nickname input"
              />
            </Animated.View>

            <Animated.View
              style={[animatedStyle(buttonAnim, 8), { marginTop: 24 }]}
            >
              <CrownButton
                propsLabel={'Continue'}
                btnColor={!crownNickname.trim() ? '#49607C' : '#93C2FA'}
                propsOnPress={() =>
                  navigation.replace('CrownOfInnerQuietEntry', {
                    crownNickname,
                  })
                }
                isDisabled={!crownNickname.trim()}
              />
            </Animated.View>
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
    justifyContent: 'center',
    paddingVertical: 20,
  },
  crownWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  crownTextBox: {
    marginTop: 20,
    backgroundColor: '#D6C08D',
    width: '90%',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 16,
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
  },
  crownLabel: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    marginTop: 51,
    color: '#fff',
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

export default CrownOfInnerQuietSetNickname;
