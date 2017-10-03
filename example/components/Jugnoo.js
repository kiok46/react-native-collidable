import React, { Component } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import Collidable from '../RNC';

const BOX_HEIGHT = Dimensions.get('window').height
const BOX_WIDTH = Dimensions.get('window').width


class JugnooItem extends Component {
	render(){
		return(
			<View
				style={styles.jugnooItemStyle}
			/>
		)
	}
}

export default class Jugnoo extends Component {

	constructor(props) {
		super(props)

	}

	render(){
		return(
			<Collidable
				collidableStyle={styles.collidableStyle}
				containerDimension={[0, BOX_WIDTH, BOX_HEIGHT, 0]}
				initialVelocityX={this.props.vel_x}
				initialVelocityY={this.props.vel_y}
				collidableOffSetWidth={20}
				collidableOffSetHeight={20}
			>
				<JugnooItem/ >
			</Collidable>
		)
	}
}

const styles = StyleSheet.create({
  collidableStyle: {
    position: 'absolute',
    zIndex: 99,
  },
  jugnooItemStyle: {
	  backgroundColor: 'yellow',
	  height: 20,
	  width: 20,
	  borderRadius: 10
  }
});
