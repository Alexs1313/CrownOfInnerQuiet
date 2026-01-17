import { createStackNavigator } from '@react-navigation/stack';

// Local imports
import CrownOfInnerQuietEntry from '../CrownOfInnerQuietViews/CrownOfInnerQuietEntry';
import CrownOfInnerQuietOnboarding from '../CrownOfInnerQuietViews/CrownOfInnerQuietOnboarding';
import CrownOfInnerQuietSetNickname from '../CrownOfInnerQuietViews/CrownOfInnerQuietSetNickname';
import CrownOfInnerQuietDailyTask from '../CrownOfInnerQuietViews/CrownOfInnerQuietDailyTask';
import CrownOfInnerQuietMeditation from '../CrownOfInnerQuietViews/CrownOfInnerQuietMeditation';
import CrownOfInnerQuietDiary from '../CrownOfInnerQuietViews/CrownOfInnerQuietDiary';
import CrownOfInnerQuietNotes from '../CrownOfInnerQuietViews/CrownOfInnerQuietNotes';
import CrownLoader from '../CrownOfInnerQuietComponents/CrownLoader';

const CrownOfInnerQuietStack = createStackNavigator();

const CrownOfInnerQuietStackNative = () => {
  return (
    <CrownOfInnerQuietStack.Navigator screenOptions={{ headerShown: false }}>
      <CrownOfInnerQuietStack.Screen
        name="CrownLoader"
        component={CrownLoader}
      />
      <CrownOfInnerQuietStack.Screen
        name="CrownOfInnerQuietOnboardig"
        component={CrownOfInnerQuietOnboardig}
      />
      <CrownOfInnerQuietStack.Screen
        name="CrownOfInnerQuietSetNickname"
        component={CrownOfInnerQuietSetNickname}
      />
      <CrownOfInnerQuietStack.Screen
        name="CrownOfInnerQuietEntry"
        component={CrownOfInnerQuietEntry}
      />
      <CrownOfInnerQuietStack.Screen
        name="CrownOfInnerQuietDailyTask"
        component={CrownOfInnerQuietDailyTask}
      />
      <CrownOfInnerQuietStack.Screen
        name="CrownOfInnerQuietMeditation"
        component={CrownOfInnerQuietMeditation}
      />
      <CrownOfInnerQuietStack.Screen
        name="CrownOfInnerQuietDiary"
        component={CrownOfInnerQuietDiary}
      />
      <CrownOfInnerQuietStack.Screen
        name="CrownOfInnerQuietNotes"
        component={CrownOfInnerQuietNotes}
      />
    </CrownOfInnerQuietStack.Navigator>
  );
};

export default CrownOfInnerQuietStackNative;
