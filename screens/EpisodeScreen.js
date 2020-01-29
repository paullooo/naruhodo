import React from 'react';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import {
  FlatList,
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Text,
  Animated
} from 'react-native';
import FooterPlayer from '../components/Footer';
import { ThemeColors } from 'react-navigation';


export default class EpisodeScreen extends React.Component {

  soundObject = new Audio.Sound();

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      playerStatus: false,
      footerValue: new Animated.Value(-52),
      currentEpisode: []
    }
    this.footerPlayer = React.createRef()
    this.soundObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
  }

  showPlayer = (bool) => {
    Animated.timing(this.state.footerValue, {
      toValue: bool ? 0 : -52,
      duration: 400
    }).start()
  };

  async showItemDetails(object) {
    // this.state.isPlaying = !this.state.isPlaying
    // this.showPlayer(this.state.isPlaying)

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
      if(this.state.playerStatus.isPlaying) {
        this.soundObject.pauseAsync()
      } else {
        this.soundObject.playAsync()
      }
      this.footerPlayer.current.update(this.state)
    } catch (error) {
      console.log(`PLAY ERROR: ${error}`)
    }
  }


  async loadContent(object) {
    try {
      this.state.currentEpisode = object
      await this.soundObject.loadAsync({ uri: object.enclosure.url });
      this.soundObject.playAsync()
      this.footerPlayer.current.update(this.state)
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
    this.showPlayer(this.state.playerStatus.isLoaded)
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
        <View style={{ flex: 1, padding: 20, backgroundColor: Colors.backgroundColor }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          initialNumToRender={12}
          renderItem={
            ({ item }) => (
              <TouchableWithoutFeedback onPress={() => this.showItemDetails(item)}>
                <View style={styles.listItem}>
                  <Image
                    style={styles.imageCell}
                    source={{ uri: item.itunes.image }}
                  />
                  <View style={{ flex: 1 }} >
                    <Text
                      numberOfLines={2}
                      style={styles.titleText}>
                      {item.title}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={styles.subtitle}>
                      {item.itunes.subtitle}
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text
                      style={styles.realeseText}>
                      <Ionicons
                        style={{}}
                        name="ios-calendar"
                        size={12}
                        color="white" />
                      {" " + Date.parse(item.isoDate)}
                    </Text>
                    <Text
                      style={styles.durationText}>
                      <Ionicons
                        style={{}}
                        name="md-time"
                        size={12}
                        color="white" />
                      {" " + item.itunes.duration}
                    </Text>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )
          }
          keyExtractor={({ item }, index) => index.toString()}
        />
      <FooterPlayer
           ref={this.footerPlayer}
           footerValue = {this.state.footerValue}
           title = { this.state.currentEpisode }
           pressPlay = { () => this.playContent() }
           pressStop = { () => this.stopContent() }
      ></FooterPlayer>
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
  headerBackTitle: 'Voltar',
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
    width: 120,
    height: 100,
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    padding: 8,
  },
  title: {
    color: 'white',
    alignContent: "center",
  },
  subtitle: {
    color: 'white',
    marginLeft: 8,
    textAlign: "left",
    fontSize: 12,
  },
  realeseText: {
    color: 'white',
    padding: 8,
    textAlign: "left",
  },
  durationText: {
    color: 'white',
    padding: 8,
    textAlign: "right",
  },
});