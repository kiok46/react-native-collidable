import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

import Collidable from './react-native-collidable';
import Jugnoo from './components/Jugnoo';


export default class App extends Component {

  constructor(props) {
      super(props)
  }

  render() {
    return (
      <View>
          <View style={styles.topBoxStyle}/>
            <Jugnoo vel_x={.3} vel_y={.4} />
            <Jugnoo vel_x={.6} vel_y={.4} />
            <Jugnoo vel_x={.1} vel_y={.8} />
            <Jugnoo vel_x={.3} vel_y={.6} />
            <Jugnoo vel_x={.4} vel_y={.3} />
            <Jugnoo vel_x={.4} vel_y={.8} />
            <Jugnoo vel_x={.9} vel_y={.6} />
            <Jugnoo vel_x={1} vel_y={1} />
            <Jugnoo vel_x={.4} vel_y={.3} />
            <Jugnoo vel_x={.4} vel_y={.6} />
            <Jugnoo vel_x={.8} vel_y={.8} />
            <Jugnoo vel_x={.6} vel_y={.3} />
            <Jugnoo vel_x={.5} vel_y={.3} />
            <Jugnoo vel_x={.7} vel_y={.8} />
            <Jugnoo vel_x={.1} vel_y={.6} />
      </View>
   )
}}

const styles = StyleSheet.create({
  topBoxStyle: {
      backgroundColor: "#303841",
      height: Dimensions.get('window').height,
  },
  collidableStyle: {
    position: 'absolute',
    zIndex: 99,
  }
});
