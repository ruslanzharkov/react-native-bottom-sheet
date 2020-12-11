import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const BottomSheet = () => {
  return (
    <View style={styles.bottomSheetContainer}>
      <View style={styles.interactable}>
        <View style={styles.bottomSheet}>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'grey',
    width: '100%',
    height: '100%',
    zIndex: 999,
    elevation: 999,
  },
  interactable: {
    flex: 1,
    flexDirection: 'column-reverse',
    height: '100%',
  },
  bottomSheet: {
    height: '85%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff',
  },
});
