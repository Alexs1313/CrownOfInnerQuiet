import { NavigationContainer as Router } from '@react-navigation/native';
import { ContextRoot } from './[WoltTresOfInnerQuiet]/[InnerWoltQuietStorage]/Context';
import Stcknavigation from './[WoltTresOfInnerQuiet]/[TresInnerQuietRoutes]/Stcknavigation';

const App = () => {
  return (
    <Router>
      <ContextRoot>
        <Stcknavigation />
      </ContextRoot>
    </Router>
  );
};

export default App;
