import React from 'react';
import { ScrollView, StyleSheet, Image } from 'react-native';
import Colors from '../constants/Colors';


export default class DetailScreen extends React.Component {

  render() {
    const { navigation } = this.props;
    var episode = JSON.stringify(navigation.getParam('episode', {}))
    episode = JSON.parse(episode)
    return (
      <ScrollView style={styles.container}>
         <Image
          style={styles.imageCell}
          source={{ uri: episode.itunes.image }}
          />
      </ScrollView>
    );
  }
}

DetailScreen.navigationOptions = {
  title: 'Detail',
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
    backgroundColor: Colors.backgroundColor,
  },
  imageCell: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
});

