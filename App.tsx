/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
} from 'react-native';

import {BottomSheet} from './src/bottomSheet';

const App = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const openDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <View style={styles.flexContainer}>
        <SafeAreaView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={openDrawer}>
              <Text style={styles.buttonText}>Open Bottom Sheet</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <BottomSheet isOpen={isOpen} openedPercentage={0.7}>
          <TouchableOpacity style={styles.button} onPress={closeDrawer}>
            <Text style={styles.buttonText}>Close Bottom Sheet</Text>
          </TouchableOpacity>
        </BottomSheet>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: 150,
    backgroundColor: 'indigo',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
  },
});

export default App;
