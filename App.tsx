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
import {StyleSheet, View, SafeAreaView, Image} from 'react-native';

import {BottomSheet} from './src/bottomSheet';
import {Button} from './src/components/button';

const BurgerCatGif = require('./gifs/burger.gif');

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
            <Button title="Open Bottom Sheet" onPress={openDrawer} />
          </View>
        </SafeAreaView>
        <BottomSheet
          isOpen={isOpen}
          openedPercentage={0.7}
          onClose={closeDrawer}>
          <View style={styles.buttonContainer}>
            <Button title="Close Bottom Sheet" onPress={closeDrawer} />
          </View>
          <Image style={styles.gif} source={BurgerCatGif} />
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
    paddingVertical: 30,
  },
  button: {
    width: 150,
    backgroundColor: 'indigo',
    padding: 10,
    borderRadius: 10,
  },
  gif: {
    flex: 1,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
  },
});

export default App;
