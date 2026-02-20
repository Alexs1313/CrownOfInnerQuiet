import { ImageBackground, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CrownOfInnerQuietLayout = ({ children }) => {
  return (
    <LinearGradient
      colors={['rgb(15, 8, 66)', 'rgb(6, 4, 21)']}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </LinearGradient>
  );
};

export default CrownOfInnerQuietLayout;
