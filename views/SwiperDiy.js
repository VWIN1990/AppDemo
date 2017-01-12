'use strict';

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, ScrollView, Image} from 'react-native';

import Dimensions from 'Dimensions';
import ImgData from './data/imgData.json';


export default class SwiperDiy extends Component {

  super() {

 	 var {width, height} = Dimensions.get('window')
  }

  getInitState() {
  	return {
  		currentPage:0
  	}
  }

  render() {
    return (
      <View style={styles.container}>
      	<ScrollView
      	  style={styles.scrollViewStyle}
      	  horizontal={true}   // 水平方向
	        showsHorizontalScrollIndicator={false}  // 隐藏水平指示器
	        showsVerticalScrollIndicator={false}    // 隐藏垂直指示器
	        pagingEnabled={true}    // 开启分页功能
	        onMomentumScrollEnd={this.onAnimationEnd}   // 当一帧滚动完毕的时候调用
      	  >
      	  {this.renderItem()}
      	</ScrollView>
      </View>
    );
  }

  renderItem() {
  	var itemAry = [];
  	var imgAry = ['./img/day1.png','./img/day2.png'];

  	for (var i = imgAry.length - 1; i >= 0; i--) {
  		var item = require('./img/day1.png');
  		itemAry.push(
  			<Image key={i}
  			  style={styles.itemStyle}
  			  source={{uri:'http://oikqyutni.bkt.clouddn.com/day2.png'}}
  			/>
  		)
  	}
  	return itemAry;
  }
}

const styles = StyleSheet.create({
	container: {
		backgroundColor:'white'
	},
	scrollViewStyle: {
		backgroundColor:'yellow',
		marginTop:20
	},
	itemStyle: {
		width:500,
		height:200,
		resizeMode:'contain'
	}

});

