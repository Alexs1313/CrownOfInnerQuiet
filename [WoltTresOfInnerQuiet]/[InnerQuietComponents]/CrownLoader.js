import React, { useEffect, useState } from 'react';
import { View as CrownLoaderWrap, Image, StyleSheet } from 'react-native';
import { WebView as CrownWebView } from 'react-native-webview';

// Local imports
import CrownOfInnerQuietLayout from './CrownOfInnerQuietLayout';
import { crownIntroLoader } from '../[WoltTresData]/crownIntroLoader';
import { useNavigation } from '@react-navigation/native';

const CrownLoader = () => {
  const navigation = useNavigation();
  const [showCrownIntroLogo, setShowCrownIntroLogo] = useState(false);

  useEffect(() => {
    const isLoading = setTimeout(() => {
      setShowCrownIntroLogo(true);

      setTimeout(() => {
        navigation.replace('Introducescrn');
      }, 2000);
    }, 4000);

    return () => clearTimeout(isLoading);
  }, [navigation]);

  return (
    <CrownOfInnerQuietLayout>
      <CrownLoaderWrap
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        {showCrownIntroLogo ? (
          <Image
            source={require('../../assets/imgs/loaderLogo.png')}
            style={{ width: 350, height: 350 }}
          />
        ) : (
          <CrownWebView
            originWhitelist={['*']}
            source={{ html: crownIntroLoader }}
            style={styles.loaderWebView}
          />
        )}
      </CrownLoaderWrap>
    </CrownOfInnerQuietLayout>
  );
};

const styles = StyleSheet.create({
  loaderWebView: {
    width: 360,
    height: 120,
    backgroundColor: 'transparent',
  },
});

export default CrownLoader;
