import { NavigationContainer } from '@react-navigation/native';
import { StoreProvider } from './[WoltTresOfInnerQuiet]/[InnerWoltQuietStorage]/crownOfInnerQuietContext';
import CrownOfInnerQuietStackNative from './[WoltTresOfInnerQuiet]/[TresInnerQuietRoutes]/CrownOfInnerQuietStackNative';

const App = () => {
  return (
    <NavigationContainer>
      <StoreProvider>
        <CrownOfInnerQuietStackNative />
      </StoreProvider>
    </NavigationContainer>
  );
};

export default App;
