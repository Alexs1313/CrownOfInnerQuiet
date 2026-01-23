import { StyleSheet, View } from 'react-native';

const CrownPagination = ({ crownCurrentStep }) => {
  return (
    <View style={styles.crownPagination}>
      {[1, 2, 3].map((item, index) => (
        <View
          key={item}
          style={[
            styles.crownPaginationDot,
            index === crownCurrentStep && { backgroundColor: '#FFFFFF' },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  crownPaginationDot: {
    width: 40,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#FFFFFF4D',
  },
  crownPagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    gap: 5,
  },
});

export default CrownPagination;
