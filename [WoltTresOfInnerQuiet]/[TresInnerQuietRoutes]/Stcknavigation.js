import { createStackNavigator } from '@react-navigation/stack';

// loader
import CrownLoader from '../[InnerQuietComponents]/CrownLoader';

// intro
import Introducescrn from '../[WoltTresViews]/Introducescrn';

// nickname
import Nicnmsscrn from '../[WoltTresViews]/Nicnmsscrn';

// welcome
import Welcmscrn from '../[WoltTresViews]/Welcmscrn';

// daily tasks
import Dailytsksscrn from '../[WoltTresViews]/Dailytsksscrn';

// meditations
import Medtationscrn from '../[WoltTresViews]/Medtationscrn';

// diary
import Diaryscrn from '../[WoltTresViews]/Diaryscrn';

// notes
import Notesscrn from '../[WoltTresViews]/Notesscrn';

const Stck = createStackNavigator();

const Stcknavigation = () => {
  return (
    <Stck.Navigator screenOptions={{ headerShown: false }}>
      <Stck.Screen name="CrownLoader" component={CrownLoader} />
      <Stck.Screen name="Introducescrn" component={Introducescrn} />
      <Stck.Screen name="Nicnmsscrn" component={Nicnmsscrn} />
      <Stck.Screen name="Welcmscrn" component={Welcmscrn} />
      <Stck.Screen name="Dailytsksscrn" component={Dailytsksscrn} />
      <Stck.Screen name="Medtationscrn" component={Medtationscrn} />
      <Stck.Screen name="Diaryscrn" component={Diaryscrn} />
      <Stck.Screen name="Notesscrn" component={Notesscrn} />
    </Stck.Navigator>
  );
};

export default Stcknavigation;
