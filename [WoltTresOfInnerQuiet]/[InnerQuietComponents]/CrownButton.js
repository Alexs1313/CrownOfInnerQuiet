import { Pressable, StyleSheet, Text } from 'react-native';

const CrownButton = ({
  propsLabel,
  propsOnPress,
  buttonW = 206,
  buttonH = 53,
  isDisabled = false,
  isFlexStart = false,
  btnColor = '#61a1efff',
}) => {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={propsOnPress}
      style={({ pressed }) => [
        styles.crownStartButton,
        pressed && styles.ispressed,
        { width: buttonW, height: buttonH },
        isDisabled && { backgroundColor: '#93C2FA80' },
        isFlexStart && { alignItems: 'flex-start' },
        { backgroundColor: btnColor },
      ]}
    >
      <Text style={styles.crownStartButtonText}>{propsLabel}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  ispressed: {
    transform: [{ translateY: 2 }],
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
  },
  crownStartButton: {
    backgroundColor: '#579aecff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 206,
    height: 53,
    paddingHorizontal: 17,
  },
  crownStartButtonText: {
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    color: '#0B1020',
    textAlign: 'center',
  },
});

export default CrownButton;
