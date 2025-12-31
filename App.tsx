import { NavigationContainer } from '@react-navigation/native';
import { StoreProvider } from './[CrownOfInnerQuiet]/CrownOfInnerQuietStorage/crownOfInnerQuietContext';
import CrownOfInnerQuietStackNative from './[CrownOfInnerQuiet]/CrownOfInnerQuietRoutes/CrownOfInnerQuietStackNative';

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
