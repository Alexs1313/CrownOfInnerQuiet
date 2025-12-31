import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
  Share,
  Image,
  Animated,
  Easing,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// Local imports
import CrownOfInnerQuietLayout from '../CrownOfInnerQuietComponents/CrownOfInnerQuietLayout';
import { useStorage } from '../CrownOfInnerQuietStorage/crownOfInnerQuietContext';

const CrownOfInnerQuietNotes = () => {
  const navigation = useNavigation();
  const { loadCrownNotes, entries } = useStorage();
  const [refreshing, setRefreshing] = useState(false);

  const headerAnim = useRef(new Animated.Value(0)).current;
  const listAnimValues = useRef([]).current;

  useEffect(() => {
    loadCrownNotes();
  }, [loadCrownNotes]);

  useEffect(() => {
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 420,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [headerAnim]);

  useEffect(() => {
    listAnimValues.length = 0;
    for (let i = 0; i < entries.length; i += 1) {
      listAnimValues[i] = new Animated.Value(0);
    }
    if (listAnimValues.length) {
      const animations = listAnimValues.map(v =>
        Animated.timing(v, {
          toValue: 1,
          duration: 360,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      );
      Animated.stagger(80, animations).start();
    }
  }, [entries]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCrownNotes();
    setRefreshing(false);
  };

  const handleDeleteNote = indexReversed => {
    Alert.alert('', 'Are you sure want to delete this entry?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes, delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const svdNotes = await AsyncStorage.getItem('crown_diary_entries');

            const parsedJSON = svdNotes ? JSON.parse(svdNotes) : [];

            const index = parsedJSON.length - 1 - indexReversed;

            parsedJSON.splice(index, 1);

            await AsyncStorage.setItem(
              'crown_diary_entries',
              JSON.stringify(parsedJSON),
            );
            await loadCrownNotes();
          } catch (e) {
            console.warn('Error deleting entry', e);
          }
        },
      },
    ]);
  };

  const handleShareNote = async item => {
    try {
      await Share.share({
        message: `${item.note}\n\n${item.date}`,
      });
    } catch (e) {
      console.warn('Share error', e);
    }
  };

  const crownNoteCard = ({ item, index }) => {
    const anim = listAnimValues[index] ?? new Animated.Value(1);
    const translateY = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [12, 0],
    });
    const opacity = anim;
    return (
      <Animated.View
        style={[styles.cardWrapper, { opacity, transform: [{ translateY }] }]}
      >
        <View style={styles.card}>
          <Text numberOfLines={6} style={styles.cardText}>
            {item.note || '...'}
          </Text>

          <View style={styles.cardFooter}>
            <Text style={styles.cardDate}>{item.date}</Text>

            <View style={styles.actions}>
              <Pressable
                onPress={() => handleShareNote(item)}
                style={styles.iconButton}
              >
                <Image source={require('../../assets/imgs/shareIcon.png')} />
              </Pressable>

              <Pressable
                onPress={() => handleDeleteNote(index)}
                style={styles.iconButton}
              >
                <Image source={require('../../assets/imgs/deleteIcon.png')} />
              </Pressable>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <CrownOfInnerQuietLayout>
      <View style={styles.container}>
        <Animated.View
          style={[
            { position: 'absolute', top: 60, left: 30, zIndex: 10 },
            {
              opacity: headerAnim,
              transform: [
                {
                  translateY: headerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-8, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={8}
            style={({ pressed }) => [pressed && styles.ispressed]}
          >
            <Image source={require('../../assets/imgs/goBackBtn.png')} />
          </Pressable>
        </Animated.View>

        <Animated.View
          style={{
            opacity: headerAnim,
            transform: [
              {
                translateY: headerAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-6, 0],
                }),
              },
            ],
          }}
        >
          <Text style={styles.title}>Your diary</Text>
        </Animated.View>

        <FlatList
          data={entries}
          keyExtractor={(_, i) => String(i)}
          renderItem={crownNoteCard}
          contentContainerStyle={styles.listContent}
          refreshing={refreshing}
          onRefresh={onRefresh}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No entries yet</Text>
            </View>
          }
        />
      </View>
    </CrownOfInnerQuietLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', padding: 30, paddingTop: 70 },
  listContent: { paddingBottom: 40, paddingTop: 10 },
  cardWrapper: {
    marginBottom: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 50,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#D6C08D',
    borderRadius: 16,
    padding: 14,
    minHeight: 150,
    justifyContent: 'space-between',
  },
  cardText: {
    color: '#0B1020',
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Montserrat-Medium',
  },
  cardFooter: {
    marginTop: 12,
    alignItems: 'flex-end',
  },
  cardDate: {
    color: '#0B1020',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ispressed: {
    transform: [{ translateY: 2 }],
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
  },
  iconButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  icon: {
    fontSize: 18,
  },
  empty: {
    marginTop: 80,
    alignItems: 'center',
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 12,
    fontFamily: 'Montserrat-Medium',
  },
  emptyButton: {
    backgroundColor: '#9FC7FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  emptyButtonText: {
    color: '#0B1020',
    fontWeight: '700',
  },
});

export default CrownOfInnerQuietNotes;
