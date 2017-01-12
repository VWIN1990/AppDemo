'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  PlatForm,Text,
  Animated, Easing
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Util from '../utils/util';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class Entrance extends Component{
	static propTypes = {
	  hideThis: React.PropTypes.func.isRequired,
	};

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	transformAnim: new Animated.Value(1),
	  	opacityAnim: new Animated.Value(1),
	  };
	}

	componentDidMount() {
		Animated.timing(
			this.state.transformAnim,
			{
				toValue:50,
				duration:1200,
				delay:2000,
				easing:Easing.elastic(2),
			}
		).start();

		Animated.timing(
			this.state.opacityAnim,
			{
				toValue:0,
				duration:800,
				delay:2200,
				easing:Easing.elastic(1)
			},
		).start();
		
		setTimeout(()=>{
			this.props.hideThis();
		}, 3300);
	}

	render() {
		return(
			<Animated.View style={[styles.entrance, {opacity:this.state.opacityAnim}]}>
				<AnimatedIcon size={60} style={[styles.twitter,{transform:[{scale:this.state.transformAnim}]}]} name="logo-twitter">
				</AnimatedIcon>
			</Animated.View>
		);
	}
}

export default class extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
    	show:true
    };
  }

/*  componentDidMount() {
  	if (PlatForm.OS === 'ios') {
  		StatusBar.setBarStyle(0);
  	}
  }*/

  _hideEntrance() {
  	this.setState({
  		show:false
  	});
  }

  render() {
  	let entrance = this.state.show?<Entrance hideThis={()=>this._hideEntrance()}/>:<View></View>;
  	return(
  		<View style={styles.twitterContainer}>
  			<Text>hello world..</Text>
  			{entrance}
  		</View>
  	);
  	
  }
}

const styles = StyleSheet.create({
	twitterContainer: {
		width: Util.size.width,
    	height: Util.size.height
	},
	entrance:{
	    position: "absolute",
	    top:0, left:0,
	    height: Util.size.height,
	    width: Util.size.width,
	    backgroundColor:"#1b95e0",
	    alignItems:"center",
	    justifyContent:"center"
	 },
   	twitter:{
	    color:"#fff",
	    position:"relative",
	    top: -20,
	    textAlign: "center"
    }
});
