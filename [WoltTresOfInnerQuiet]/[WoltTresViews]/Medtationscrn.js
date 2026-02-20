import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
  Easing,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Sound from 'react-native-sound';

// Local imports
import CrownOfInnerQuietLayout from '../[InnerQuietComponents]/CrownOfInnerQuietLayout';
import CrownButton from '../[InnerQuietComponents]/CrownButton';
import { setTodayProgress } from '../[TresUtils]/progress';

const MeditationTracks = [
  '740607__sergequadrado__piano-for-meditation.mp3',
  '740609__sergequadrado__relaxing-meditation.mp3',
];
const boldF = 'Montserrat-Bold';
const mediumF = 'Montserrat-Medium';
const primaryWhite = '#FFFFFF';

const Medtationscrn = () => {
  const navigation = useNavigation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [loadingSound, setLoadingSound] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);

  const bars = useRef(
    Array.from({ length: 21 }, () => new Animated.Value(0)),
  ).current;
  const runningRef = useRef(null);
  const soundRef = useRef(null);

  const headerAnim = useRef(new Animated.Value(0)).current;
  const imgAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;
  const controlsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (Platform.OS === 'android') {
      Sound.setCategory && Sound.setCategory('Playback');
    }
    Animated.stagger(90, [
      Animated.timing(headerAnim, {
        toValue: 1,
        duration: 360,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(imgAnim, {
        toValue: 1,
        duration: 420,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(titleAnim, {
        toValue: 1,
        duration: 420,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(waveAnim, {
        toValue: 1,
        duration: 420,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(controlsAnim, {
        toValue: 1,
        duration: 420,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    return () => {
      stopAndReleaseSound();
      stopWaveform();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        pauseSound();
        stopWaveform();
      };
    }, []),
  );

  useEffect(() => {
    if (runningRef.current) {
      runningRef.current.stop();
      runningRef.current = null;
      bars.forEach(b => b.stopAnimation());
    }

    if (isPlaying) {
      const animations = bars.map(anim =>
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 700,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0.2,
            duration: 700,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      );
      const staggered = Animated.stagger(80, animations);
      runningRef.current = Animated.loop(staggered);
      runningRef.current.start();
    } else {
      bars.forEach(b =>
        Animated.timing(b, {
          toValue: 0.2,
          duration: 250,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }).start(),
      );
    }
  }, [isPlaying]);

  const startWaveform = () => setIsPlaying(true);
  const stopWaveform = () => setIsPlaying(false);

  const loadAndPlaySound = (index = 0) => {
    const soundName = MeditationTracks[index];
    if (!soundName) return;

    if (soundRef.current) {
      try {
        soundRef.current.play(success => {
          if (!success) console.warn('Sound playback failed');
        });
        startWaveform();
        return;
      } catch (e) {}
    }

    setLoadingSound(true);

    const crownSound = new Sound(soundName, Sound.MAIN_BUNDLE, error => {
      setLoadingSound(false);
      if (error) {
        console.warn('Failed to load sound', error);
        return;
      }
      soundRef.current = crownSound;
      soundRef.current.setNumberOfLoops(0);
      soundRef.current.play(success => {
        if (!success) console.warn('Sound playback failed');
        stopWaveform();
        setTrackIndex(prev => (prev + 1) % MeditationTracks.length);
        try {
          soundRef.current.release();
        } catch (_) {}
        soundRef.current = null;
      });
      startWaveform();
    });
  };

  const pauseSound = () => {
    if (soundRef.current && typeof soundRef.current.pause === 'function') {
      try {
        soundRef.current.pause();
      } catch (error) {
        try {
          soundRef.current.stop();
        } catch (err) {}
      }
    } else if (
      soundRef.current &&
      typeof soundRef.current.stop === 'function'
    ) {
      try {
        soundRef.current.stop();
      } catch (e) {}
    }
    stopWaveform();
  };

  const stopAndReleaseSound = () => {
    if (soundRef.current) {
      try {
        soundRef.current.stop(() => {
          try {
            soundRef.current.release();
          } catch (_) {}
          soundRef.current = null;
        });
      } catch (e) {
        try {
          soundRef.current.release();
        } catch (_) {}
        soundRef.current = null;
      }
    }
    stopWaveform();
  };

  const handleStartFromIntro = () => {
    setShowIntro(false);
    loadAndPlaySound(trackIndex);
  };

  const handleTogglePlay = () => {
    if (completed) return;

    setShowIntro(false);

    if (!isPlaying) {
      if (!soundRef.current) {
        loadAndPlaySound(trackIndex);
      } else {
        try {
          soundRef.current.play(success => {
            if (!success) console.warn('Sound playback failed');
          });
        } catch (error) {
          loadAndPlaySound(trackIndex);
        }
        startWaveform();
      }
    } else {
      pauseSound();
    }
  };

  const handleStopAndComplete = async () => {
    stopAndReleaseSound();
    stopWaveform();
    setCompleted(true);
    try {
      await setTodayProgress(2);
    } catch (error) {
      console.warn('Failed', error);
    }
  };

  const animatedCrownBoxStyle = (anim, offset = 12) => ({
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [offset, 0],
        }),
      },
      {
        scale: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.98, 1],
        }),
      },
    ],
  });

  if (completed) {
    return (
      <CrownOfInnerQuietLayout>
        <View style={styles.crownBox}>
          <Animated.View
            style={[
              animatedCrownBoxStyle(headerAnim, 6),
              { alignSelf: 'flex-start', marginBottom: 10 },
            ]}
          >
            <Pressable onPress={() => navigation.popToTop()} hitSlop={8}>
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
              animatedCrownBoxStyle(titleAnim, 16),
              { alignItems: 'center', width: '100%', marginTop: 18 },
            ]}
          >
            <Text style={styles.completedTitle}>
              You have accomplished everything for today.
            </Text>

            <Text style={styles.completedSubtitle}>
              Write down your feelings in your diary
            </Text>

            <View style={{ marginTop: 24, width: '100%' }}>
              <CrownButton
                propsLabel={'To the diary'}
                propsOnPress={() =>
                  navigation.navigate('Diaryscrn', {
                    crownNickname: '',
                  })
                }
                buttonW={'100%'}
                buttonH={67}
              />
            </View>
          </Animated.View>
        </View>
      </CrownOfInnerQuietLayout>
    );
  }

  if (showIntro) {
    return (
      <CrownOfInnerQuietLayout>
        <View style={styles.crownBox}>
          <Animated.View
            style={[
              animatedCrownBoxStyle(headerAnim, 6),
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
              animatedCrownBoxStyle(titleAnim, 16),
              { alignItems: 'center', width: '100%', marginTop: 18 },
            ]}
          >
            <Text style={styles.crownLabel}>Meditation</Text>
            <Text style={styles.subtitle}>Daily meditation for stillness</Text>

            <View style={{ marginTop: 24, width: '100%' }}>
              <CrownButton
                propsLabel={'Start meditation'}
                propsOnPress={handleStartFromIntro}
                buttonW={'100%'}
                buttonH={67}
              />
            </View>
          </Animated.View>
        </View>
      </CrownOfInnerQuietLayout>
    );
  }

  return (
    <CrownOfInnerQuietLayout>
      <View style={styles.crownBox}>
        <Animated.View
          style={[
            animatedCrownBoxStyle(headerAnim, 6),
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
            animatedCrownBoxStyle(titleAnim, 16),
            { alignItems: 'center', width: '100%' },
          ]}
        >
          <Text style={styles.crownLabel}>Meditation</Text>
          <Text style={styles.subtitle}>Just breathe</Text>
        </Animated.View>

        <Animated.View
          style={[animatedCrownBoxStyle(waveAnim, 18), styles.waveContainer]}
        >
          <View style={styles.waveInner}>
            {bars.map((anim, i) => {
              const scale = anim.interpolate({
                inputRange: [0.2, 1],
                outputRange: [0.6, 1.6],
              });
              const opacity = anim.interpolate({
                inputRange: [0.2, 1],
                outputRange: [0.4, 1],
              });
              return (
                <Animated.View
                  key={`bar-${i}`}
                  style={[
                    styles.bar,
                    {
                      transform: [{ scaleY: scale }],
                      opacity,
                    },
                  ]}
                />
              );
            })}
          </View>
        </Animated.View>

        <Animated.View
          style={[
            animatedCrownBoxStyle(controlsAnim, 12),
            { alignItems: 'center', width: '100%' },
          ]}
        >
          <View style={{ marginTop: 18 }}>
            <Pressable
              onPress={handleTogglePlay}
              style={({ pressed }) => [
                styles.playButton,
                pressed && styles.playButtonPressed,
              ]}
            >
              <View style={styles.playIconContainer}>
                {!isPlaying ? (
                  <View style={styles.playTriangle} />
                ) : (
                  <View style={styles.pauseWrapper}>
                    <View style={styles.pauseBar} />
                    <View style={styles.pauseBar} />
                  </View>
                )}
              </View>
            </Pressable>
          </View>

          {loadingSound && (
            <View style={{ marginTop: 12 }}>
              <ActivityIndicator color="#fff" />
            </View>
          )}

          <View style={{ marginTop: 30, width: '100%', alignItems: 'center' }}>
            <CrownButton
              propsLabel={'Enough'}
              propsOnPress={handleStopAndComplete}
              buttonW={206}
              buttonH={53}
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
  crownLabel: {
    fontSize: 24,
    fontFamily: boldF,
    marginBottom: 10,
    marginTop: 12,
    color: primaryWhite,
    textAlign: 'center',
  },
  subtitle: {
    color: primaryWhite,
    marginTop: 6,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: mediumF,
  },
  waveContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 18,
  },
  waveInner: {
    width: '86%',
    height: 56,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  bar: {
    width: 6,
    height: 20,
    borderRadius: 3,
    backgroundColor: primaryWhite,
    marginHorizontal: 2,
    transform: [{ scaleY: 0.6 }],
  },
  playButton: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: primaryWhite,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
  },
  playButtonPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.88,
  },
  playIconContainer: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 18,
    borderLeftColor: '#0B1020',
    borderTopWidth: 12,
    borderTopColor: 'transparent',
    borderBottomWidth: 12,
    borderBottomColor: 'transparent',
    marginLeft: 4,
  },
  pauseWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 20,
  },
  pauseBar: {
    width: 6,
    height: 20,
    backgroundColor: '#0B1020',
    borderRadius: 2,
  },
  completedTitle: {
    fontSize: 24,
    fontFamily: boldF,
    color: primaryWhite,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  completedSubtitle: {
    fontSize: 20,
    color: primaryWhite,
    textAlign: 'center',
    marginTop: 8,
    fontFamily: mediumF,
    paddingHorizontal: 22,
  },
});

export default Medtationscrn;
