import React, {useRef} from 'react';
import {
  TouchableOpacity,
  Animated,
  PanResponder,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const TopButton = () => {
  const translateY = useRef(new Animated.Value(-60)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (evt, gestureState) => {
        translateY.setValue(Math.max(-60, gestureState.dy - 60));
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy < 0) {
          Animated.timing(translateY, {
            toValue: -60,
            duration: 200,
            useNativeDriver: true,
          }).start();
        } else if (gestureState.dy > 60) {
          Animated.timing(translateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.timing(translateY, {
            toValue: -60,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <Animated.View
      style={[styles.container, {transform: [{translateY}]}]}
      {...panResponder.panHandlers}>
      <TouchableOpacity style={styles.button}>
        <Icon name="arrow-up" size={24} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: -60,
    right: 20,
    width: 60,
    height: 60,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TopButton;
