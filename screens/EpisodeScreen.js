import React from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { Audio } from 'expo-av';
import Colors from '../constants/Colors';


export default class EpisodeScreen extends React.Component {
  
  soundObject = new Audio.Sound();

  constructor(props) {
    super(props);
    this.state = { isLoading: true,
                   playerStatus: false }
    this.soundObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
  }

  async showItemDetails(object) {
    // this.props.navigation.navigate('Detail', {
    //   episode: object
    // });

    try {
      if (this.state.playerStatus.isPlaying) {
        this.stopContent()
        return
      }
      this.loadContent(object)
    } catch (error) {
      console.log(`RELOAD ERROR: ${error}`)
    }

  }

  async playContent() {
    try {
      await this.soundObject.playAsync()
    } catch (error) {
      console.log(`PLAY ERROR: ${error}`)
    }
  }

  async loadContent(object) {
      try {
        await this.soundObject.loadAsync({ uri: object.enclosure.url });
      } catch (error) {
        console.log(`LOAD ERROR: ${error}`)
      }
  }

  async stopContent() {
    try {
      await this.soundObject.unloadAsync()
    } catch (error) {
      console.log(`STOP ERROR: ${error}`)
    }
  }

  _onPlaybackStatusUpdate = status => {
    this.state.playerStatus = status
    if(status.isLoaded && !status.isPlaying) {
      this.playContent()
    }
    if (status.error) {
      console.log(`FATAL PLAYER ERROR: ${status.error}`);
    }
  };

  componentDidMount() {

    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });

    return fetch('https://tranquil-sea-89168.herokuapp.com')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function () {
        });

      })
      .catch((error) => {
        console.error(error);
      });

  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={
            ({ item }) => (
              <View style={styles.listItem}>
              <TouchableWithoutFeedback onPress={() => this.showItemDetails(item)}>
                  <Image
                    style={styles.imageCell}
                    source={{ uri: item.itunes.image }}
                  />
              </TouchableWithoutFeedback>
              {/* <ActivityIndicator /> */}
              </View>
            )
          }
          keyExtractor={({ item }, index) => index}
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
    paddingLeft: 20,
    paddingRight: 20,
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