import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    TouchableWithoutFeedback,
    Text,
    Animated,
    StyleSheet,
    Dimensions
  } from 'react-native';

export default function PlayerFooter(props) {
  const animatedStyle = { bottom: props.footerValue };
  return (
    <Animated.View style={[styles.player, animatedStyle]}>
    <Text style={styles.playerTitle}>{props.isPlaying ? "TITLE" : props.title}</Text>
    <Text style={styles.playerTitle}>Subtitle</Text>
    <TouchableWithoutFeedback
      onPress={() => props.pressPlay() } 
    > 
      <Ionicons
        style={{ position: 'absolute', left: 0, marginTop: 8, marginLeft: 16 }} 
        name={ props.isPlaying ? "md-play" : "md-pause"}
        size={32}
        color="white" />
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback
      onPress={() => props.pressStop() }
    >
      <Ionicons
        style={{ position: 'absolute', right: 0, marginTop: 8, marginRight: 16 }}
        name="md-close-circle"
        size={32}
        color="white" />
    </TouchableWithoutFeedback>
  </Animated.View>
  );
}

const styles = StyleSheet.create({
    player: {
      position: 'absolute',
      backgroundColor: '#1a1a1a',
      height: 52,
      width: Dimensions.get('window').width
    },
    playerTitle: {
      color: 'white',
      textAlign: "center",
      marginTop: 6,
    }
  });