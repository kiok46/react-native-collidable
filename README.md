# react-native-collidable
Collidable Components in react native

### IntroScreen Example

<img src="https://user-images.githubusercontent.com/7335120/28744801-40b809ba-7486-11e7-946b-38ab4e6698c3.gif" width="350">


### Bouncing Football Example

<img src="https://user-images.githubusercontent.com/7335120/28745749-1a3e3dde-749c-11e7-8dbf-802b004a642c.gif" width="350">


### Note: Only tested with iOS, not recommended to be used until `version 1.0` is released.


Find a working example on Expo: https://exp.host/@kiok46/collidable


#### Properties
*Note: Other properties will be passed down to underlying component.*

| Prop | Description | Default |
|---|---|---|
|**`disablePanResponder`**| Whether to use PanResponder or not. |*false*|
|**`containerDimension`**|For how long the animation will run (milliseconds). |`[0, Screen Width, Screen Height, 0]`|
|**`collidableOffSetHeight`**| Use `Container Height - Component Height` to create a illusion of contact with the edges. |`75`|
|**`collidableOffSetWidth`**| Use `Container Width - Component Width` to create a illusion of contact with the edges. |`75`|
|**`initialVelocityX`**| Initial Velocity of Component in x-direction |`0`|
|**`initialVelocityY`**| Initial Velocity of Component in y-direction |`0`|
|**`velocityMinX`**| Minimum velocity in x-direction required to to stop the Component |`0.06`|
|**`velocityMinY`**| Minimum velocity in y-direction required to to stop the Component |`0.06`|
|**`velocityMaxX`**| Max velocity in x-direction once reached use `ononReachingMaxVelocity` callback |`30`|
|**`velocityMaxY`**| Max velocity in y-direction once reached use `ononReachingMaxVelocity` callback |`30`|
|**`verticalGravityEnabled`**| Gravity effect in vertical direction  |*false*|
|**`horizontalGravityEnabled`**|  Gravity effect in horizontal direction |*false*|
|**`verticalGravity`**| Gravity effect value in vertical direction. |`.2`|
|**`horizontalGravity`**| Gravity effect value in horizontal direction. |`.2`|
|**`enableImpactForce`**| Impace force is used to reduce the speed of colliding Component after impact  |*false*|
|**`verticalImpactForce`**| Impact force for reducing vertical speed  |`0`|
|**`horizontalImpactForce`**| Impact force for reducing horizontal speed |`0`|
|**`collidableStyle`**| Style for the Animated Component |*None*|
|**`onReachingMaxVelocity`**| Called once the Component's velocity is >= `velocityMaxX` or `velocityMaxY` |`() => {}`|


### Want to contribute or need to see some improvements?
I would love that, please create an issue or send a PR.
