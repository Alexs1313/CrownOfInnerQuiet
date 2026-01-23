import { createStackNavigator } from '@react-navigation/stack';

// Local imports
import CrownOfInnerQuietEntry from '../[WoltTresViews]/CrownOfInnerQuietEntry';
import CrownOfInnerQuietOnboarding from '../[WoltTresViews]/CrownOfInnerQuietOnboarding';
import CrownOfInnerQuietSetNickname from '../[WoltTresViews]/CrownOfInnerQuietSetNickname';
import CrownOfInnerQuietDailyTask from '../[WoltTresViews]/CrownOfInnerQuietDailyTask';
import CrownOfInnerQuietMeditation from '../[WoltTresViews]/CrownOfInnerQuietMeditation';
import CrownOfInnerQuietDiary from '../[WoltTresViews]/CrownOfInnerQuietDiary';
import CrownOfInnerQuietNotes from '../[WoltTresViews]/CrownOfInnerQuietNotes';
import CrownLoader from '../[InnerQuietComponents]/CrownLoader';

const CrownOfInnerQuietStack = createStackNavigator();

const CrownOfInnerQuietStackNative = () => {
  return (
    <CrownOfInnerQuietStack.Navigator screenOptions={{ headerShown: false }}>
      <CrownOfInnerQuietStack.Screen
        name="CrownLoader"
        component={CrownLoader}
      />
      <CrownOfInnerQuietStack.Screen
        name="CrownOfInnerQuietOnboarding"
        component={CrownOfInnerQuietOnboarding}
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
