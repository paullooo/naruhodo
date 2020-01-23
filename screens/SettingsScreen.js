import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';


export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container}>

    </ScrollView>
  )
}

SettingsScreen.navigationOptions = {
  title: 'Configurações',
  headerStyle: {
    backgroundColor: Colors.barColor,
    borderBottomColor: '#000'

  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.backgroundColor,
  },
});