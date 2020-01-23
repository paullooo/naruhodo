import React from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { Audio } from 'expo-av';
import Colors from '../constants/Colors';

export default class EpisodeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = { isLoading: true }
    this.onPlaybackStatusUpdate = null
  }

  async showItemDetails(object) {

      const soundObject = new Audio.Sound();
      try {
        soundObject.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
        await soundObject.loadAsync({ uri: object.enclosure.link });
        await soundObject.playAsync();
      } catch (error) {
        console.log(error)
      }

  }

  componentDidMount() {

    return fetch('https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.feedburner.com%2Fnaruhodopodcast')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.items,
        }, function(){
        });

      })
      .catch((error) =>{
        console.error(error);
      });

  }

  render(){

    if(this.state.isLoading) {
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={
            ({item}) => (
                <TouchableWithoutFeedback  onPress ={() => this.showItemDetails(item)}>
                    <View style={styles.listItem}>
                        <Image
                            style={styles.imageCell}
                            source={{uri: item.thumbnail}}
                        />
                    </View>
                </TouchableWithoutFeedback>
            )
        }
          keyExtractor={({item}, index) => index }
        />
      </View>
    );
  }
}

EpisodeScreen.navigationOptions = {
  title: 'Naruhodo!',
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
  imageCell: {
    width: 180,
    height: 180,
    margin: 4,
    borderRadius: 8
  },
  listItem: {

  },
  title: {
    color: 'white',
    alignContent: "center"
  },
});