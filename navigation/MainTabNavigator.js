import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import EpisodeScreen from '../screens/EpisodeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Colors from '../constants/Colors';
import DetailScreen from '../screens/DetailScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const LinksStack = createStackNavigator(
  {
    Links: EpisodeScreen,
    Detail: DetailScreen
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Episódios',
  tabBarOptions: {
    style: {
      backgroundColor: Colors.barColor,
      borderTopColor: '#000',
    },
    activeTintColor: '#fff',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-albums' : 'md-albums'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Favoritos',
  tabBarOptions: {
    style: {
      backgroundColor: Colors.barColor,
      borderTopColor: '#000',
    },
    activeTintColor: '#fff',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  LinksStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
