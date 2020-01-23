import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function LoginScreen() {
  return (
    <ScrollView style={styles.container}>

    </ScrollView>
  )
}

LoginScreen.navigationOptions = {
  title: 'Login',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});