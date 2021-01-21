import React, {ReactNode, useEffect, useState} from 'react';
import {View, StyleSheet, Animated, Dimensions} from 'react-native';

const openedPercent = 100;

interface BottomSheetProps {
  isOpen: boolean;
  openedPercentage: number;
  children: React.FC | Element | ReactNode;
}

export const BottomSheet = ({
  isOpen,
  openedPercentage,
  children,
}: BottomSheetProps) => {
  const windowHeight = Dimensions.get('screen').height;
  const pixelPercentHeight = windowHeight * openedPercentage;
  const [animation] = useState(new Animated.Value(pixelPercentHeight * 2));
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const heightValue = openedPercentage * openedPercent;
  const heightStyle = {height: `${heightValue}%`};

  useEffect(() => {
    if (isOpen) {
      setDrawerOpen(true);
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setDrawerOpen(false), 300);
      Animated.timing(animation, {
        toValue: pixelPercentHeight * 2,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen]);

  return (
    isDrawerOpen && (
      <>
        <View style={styles.bottomSheetContainer}>
          <View style={styles.interactable}>
            <Animated.View
              style={[
                styles.bottomSheet,
                heightStyle,
                {
                  transform: [{translateY: animation}],
                },
              ]}>
              {children}
            </Animated.View>
          </View>
        </View>
      </>
    )
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
