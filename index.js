import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder,
  UIManager,
  Dimensions,
  findNodeHandle,
} from 'react-native';
import PropTypes from 'prop-types';


export default class Collidable extends Component {

    constructor(props) {
  	  super(props)

      this.animatedObject = null;
	  let vel_x = 0;
	  let vel_y = 0;
  	  const position = new Animated.ValueXY();
  	  const panResponder = PanResponder.create({
  		  onStartShouldSetPanResponder: (evt, gestureState) => {
            this.setState({ captureResponder: true })
            if (!this.props.disablePanResponder){
                return gestureState.dx != 0 && gestureState.dy != 0;
            }
          },
          onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
            if (!this.props.disablePanResponder){
                return gestureState.dx != 0 && gestureState.dy != 0;
            }
          },
  		  onPanResponderMove: (event, gestureState) => {
			  this.stopCollidable()

              var [
                  TOP_Y,
                  RIGHT_X,
                  BOTTOM_Y,
                  LEFT_X,
              ] = this.props.containerDimension

              const { x, y } = this.state;
              const { collidableOffSetWidth, collidableOffSetHeight } = this.props;

              if (x + gestureState.dx >= (RIGHT_X - collidableOffSetWidth )||
                  x + gestureState.dx <= LEFT_X ||
                  y + gestureState.dy >= (BOTTOM_Y - collidableOffSetHeight) ||
                  y + gestureState.dy <= TOP_Y) {

                  this.setState({ captureResponder: false })
              } else {
                  vel_x = gestureState.vx;
                  vel_y = gestureState.vy;
                  position.setValue({
                        x: this.state.x + gestureState.dx,
                        y: this.state.y + gestureState.dy
                  })
              }

		  },
  		  onPanResponderRelease: (event, gestureState) => {
			  requestAnimationFrame(() => {
				  UIManager.measure(findNodeHandle(this.animatedObject), (x, y) =>{
					  this.setState({
                            x: x,
                            y: y,
                            vx: vel_x,
                            vy: vel_y
                        })
					  this.interval = setInterval(this.update, 1000 / 60);
				  })
			  })
		  },
  	  })

  	  this.state = {
		  panResponder,
          captureResponder: true,
		  position,
		  x: 0,
		  y: 0,
		  vx: this.props.initialVelocityX,
		  vy: this.props.initialVelocityY,
	  }
    }

    componentDidMount() {
        if (this.props.initialVelocityX !== 0 || this.props.initialVelocityY !== 0){
            requestAnimationFrame(() => {
                UIManager.measure(findNodeHandle(this.animatedObject), (x, y) =>{
                    this.state.position.setValue({
                          x: x + this.props.initialVelocityX,
                          y: y + this.props.initialVelocityY
                    })

                    this.setState({
                          x: x + this.props.initialVelocityX,
                          y: y + this.props.initialVelocityY,
                          vx: this.props.initialVelocityX,
                          vy: this.props.initialVelocityY
                      })
                    this.interval = setInterval(this.update, 1000 / 60);
                })
            })
        }
    }

    componentWillUnmount() {
      if (this.interval) {
        clearInterval(this.interval);
      }
    }

    stopCollidable = () => {
      if (this.interval) {
    	clearInterval(this.interval);
      }
    }

    update = () => {
	  const { x, y, vx, vy, position } = this.state;
      const {
          enableImpactForce,
          verticalImpactForce,
          horizontalImpactForce,
          verticalGravityEnabled,
          horizontalGravityEnabled,
          verticalGravity,
          horizontalGravity,
          collidableOffSetWidth,
          collidableOffSetHeight,
          velocityMinY,
          velocityMinX,
          velocityMaxY,
          velocityMaxX,
          containerDimension,
      } = this.props;

      var [
          TOP_Y,
          RIGHT_X,
          BOTTOM_Y,
          LEFT_X,
        ] = containerDimension

	  let { x_, y_, vx_, vy_ } = 0

	  if (y >= BOTTOM_Y - collidableOffSetHeight || y <= TOP_Y){
		  vy_ =  enableImpactForce === true ? -(vy - ( vy * verticalImpactForce )) : -vy
	  } else {
		  vy_ =  verticalGravityEnabled === true ? (vy + verticalGravity) : vy;
	  }

	  if ( x >= RIGHT_X - collidableOffSetWidth ||  x  <= LEFT_X){
		  vx_ = enableImpactForce === true ? -(vx - ( vx * horizontalImpactForce )) : -vx
	  } else {
          vx_ =  horizontalGravityEnabled === true ? (vx + horizontalGravity) : vx;
	  }

	  if ((vy_ >= -velocityMinY && vy_ <= velocityMinY) &&
          (vx_ >= -velocityMinX && vx_ <= velocityMinX) &&
          ( x >= RIGHT_X - collidableOffSetWidth )) {
		this.stopCollidable()
	  }

      if ( vy_ >= velocityMaxY || vx_ >= velocityMaxX ) {
          this.props.onReachingMaxVelocity()
      } else {
          position.setValue({
              x: x + vx_,
              y: y + vy_,
          })
          this.setState({
              x: x + vx_,
              y: y + vy_,
              vy: vy_,
              vx: vx_,
          })
      }
    }

    render() {
      return (
		<Animated.View
			ref={animatedObject => this.animatedObject = animatedObject}
			{...this.state.panResponder.panHandlers}
			style={[{...this.state.position.getLayout()}, this.props.collidableStyle]}
		>
            {this.props.children}
		</Animated.View>
    );
  }
}


Collidable.defaultProps = {

    disablePanResponder: false,

    containerDimension: [
        0,
        Dimensions.get('window').width,
        Dimensions.get('window').height,
        0
    ],
    collidableOffSetHeight: 75,
    collidableOffSetWidth: 75,

    initialVelocityX: 0,
    initialVelocityY: 0,
    velocityMinX: 0.06,
    velocityMinY: 0.06,
    velocityMaxX: 30,
    velocityMaxY: 30,

    enableGravity: false,
    verticalGravityEnabled: false,
    horizontalGravityEnabled: false,
    verticalGravity: .2,
    horizontalGravity: .2,

    enableImpactForce: false,
    verticalImpactForce: 0,
    horizontalImpactForce: 0,
    onReachingMaxVelocity: () => {},
};


Collidable.propTypes = {

    disablePanResponder: PropTypes.bool,

    containerDimension: PropTypes.array,
    collidableOffSetHeight: PropTypes.number,
    collidableOffSetWidth: PropTypes.number,

    initialVelocityX: PropTypes.number,
    initialVelocityY: PropTypes.number,
    velocityMinX: PropTypes.number,
    velovityMinY: PropTypes.number,
    velocityMaxX: PropTypes.number,
    velovityMaxY: PropTypes.number,

    enableGravity: PropTypes.bool,
    verticalGravityEnabled: PropTypes.bool,
    horizontalGravityEnabled: PropTypes.bool,
    verticalGravity: PropTypes.number,
    horizontalGravity: PropTypes.number,

    enableImpactForce: PropTypes.bool,
    verticalImpactForce: PropTypes.number,
    horizontalImpactForce: PropTypes.number,

    collidableStyle: View.propTypes.style,
    onReachingMaxVelocity: PropTypes.func,
};
