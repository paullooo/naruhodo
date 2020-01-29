import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    TouchableWithoutFeedback,
    Text,
    Animated,
    StyleSheet,
    Dimensions,
    View
  } from 'react-native';


export default class FooterPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            footerValue: this.props.footerValue,
            title: this.props.title
        };
    }

    update = (state) => {
        this.setState({ title: state.currentEpisode.title, isPlaying: state.playerStatus.isPlaying  })
        this.forceUpdate()
    }

    componentDidUpdate() {
        console.log('UPDATE')
    }

    componentDidMount() {
        this.setState({ footerValue: this.props.footerValue})
        console.log('MOUNT')
    }

    shouldComponentUpdate(nextProps) {
        console.log(nextProps)
        const differentTitle = this.props.title !== nextProps.title;
        return differentTitle
    }

    animatedStyle = { bottom: this.props.footerValue };
    render() {
        return(
        <Animated.View style={[styles.player, this.animatedStyle]}>
        <Text style={styles.playerTitle}>{ this.state.title }</Text>
        <Text style={styles.playerTitle}>{ this.state.subtitle }</Text>
        <TouchableWithoutFeedback
          onPress={() => this.props.pressPlay() } 
        > 
          <Ionicons
            style={{ position: 'absolute', left: 0, marginTop: 8, marginLeft: 16, paddingRight: 8 }} 
            name={ this.state.isPlaying ? "md-play" : "md-pause"}
            size={32}
            color="white" />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => this.props.pressStop() }
        >
          <Ionicons
            style={{ position: 'absolute', right: 0, marginTop: 8, marginRight: 16 }}
            name="md-close-circle"
            size={32}
            color="white" />
        </TouchableWithoutFeedback>
      </Animated.View>
      )
    }

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
      marginTop: 8,
      fontSize: 12,
      backgroundColor: 'blue',
    }
  });
