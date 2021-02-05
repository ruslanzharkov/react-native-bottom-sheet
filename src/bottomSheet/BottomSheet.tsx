import React, {ReactNode, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

const openedPercent = 100;
const durationMs = 350;

interface BottomSheetProps {
  isOpen: boolean;
  openedPercentage: number;
  children: React.FC | Element | ReactNode;
  onClose: () => void;
}

export const BottomSheet = ({
  isOpen,
  openedPercentage,
  children,
  onClose,
}: BottomSheetProps) => {
  const windowHeight = Dimensions.get('screen').height;
  const pixelPercentHeight = windowHeight * openedPercentage;
  const heightValue = openedPercentage * openedPercent;
  const heightStyle = {height: `${heightValue}%`};

  const [animation] = useState<Animated.Value>(
    new Animated.Value(pixelPercentHeight * 2),
  );
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setDrawerOpen(true);
      Animated.timing(animation, {
        toValue: 0,
        duration: durationMs,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setDrawerOpen(false), durationMs);
      Animated.timing(animation, {
        toValue: pixelPercentHeight * 2,
        duration: durationMs,
        useNativeDriver: true,
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return isDrawerOpen ? (
    <>
      <View style={styles.bottomSheetContainer}>
        <View style={styles.animationContainer}>
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
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.touchableTransparentContainer} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </>
  ) : null;
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    width: '100%',
    height: '100%',
    zIndex: 999,
    elevation: 999,
  },
  animationContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
    height: '100%',
  },
  bottomSheet: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff',
  },
  touchableTransparentContainer: {
    flex: 1,
  },
});
