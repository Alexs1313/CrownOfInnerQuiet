import { ImageBackground, ScrollView } from 'react-native';

const CrownOfInnerQuietLayout = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../assets/imgs/background.png')}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

export default CrownOfInnerQuietLayout;
