import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';

const openedPercent = 100;

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  openedPercentage: number;
}

export const BottomSheet = ({isOpen, onClose, openedPercentage}: BottomSheetProps) => {
  if (!isOpen) {
    return null;
  }

  const heightStyle = {height: `${openedPercentage * openedPercent}%`};
  const bottomSheetStyles = [styles.bottomSheet, heightStyle];

  return (
    <>
      <View style={styles.bottomSheetContainer}>
        <Animated.View style={styles.interactable}>
          <View style={bottomSheetStyles} />
        </Animated.View>
      </View>
    </>
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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff',
  },
});
