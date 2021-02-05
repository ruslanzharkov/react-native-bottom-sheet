import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

interface ButtonProps {
  title: string;
  onPress: () => void;
}

export const Button = ({title, onPress}: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 150,
    backgroundColor: '#FAB67E',
    padding: 10,
    borderRadius: 10,
  },
  buttonTitle: {
    color: '#fff',
  },
});
