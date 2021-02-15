import React, {ReactNode, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  PanResponder,
} from 'react-native';

const openedPercent = 100;
const durationMs = 350;
const nativeDriverConfig = {
  useNativeDriver: true,
};

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
  const bottomSheetHeight = Math.floor(windowHeight * openedPercentage);
  const heightValue = openedPercentage * openedPercent;
  const heightStyle = {height: `${heightValue}%`};

  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [animation] = useState<Animated.Value>(
    new Animated.Value(bottomSheetHeight * 2),
  );

  const [pan] = useState<Animated.ValueXY>(new Animated.ValueXY());
  const [panResponder] = useState(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy >= 0) {
          Animated.timing(animation, {
            toValue: gestureState.dy,
            duration: 0,
            ...nativeDriverConfig,
          }).start();
        }

        return Animated.event([null, {dx: pan.x, dy: pan.y}], {
          ...nativeDriverConfig,
        });
      },
      onPanResponderRelease: (e, gestureState) => {
        pan.flattenOffset();
        if (gestureState.dy < bottomSheetHeight / 2) {
          Animated.timing(animation, {
            toValue: 0,
            duration: durationMs,
            ...nativeDriverConfig,
          }).start();
        } else {
          onClose();
        }
      },
    }),
  );

  useEffect(() => {
    if (isOpen) {
      setDrawerOpen(true);
      Animated.timing(animation, {
        toValue: 0,
        duration: durationMs,
        ...nativeDriverConfig,
      }).start();
    } else {
      requestAnimationFrame(() => {
        setTimeout(() => setDrawerOpen(false), durationMs);
      });
      Animated.timing(animation, {
        toValue: bottomSheetHeight * 2,
        duration: durationMs,
        ...nativeDriverConfig,
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
            ]}
            {...panResponder.panHandlers}>
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
