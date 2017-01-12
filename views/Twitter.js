'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View, TouchableOpacity,
  PlatForm,Text,RefreshControl, ScrollView,
  Animated, Easing, Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Util from '../utils/util';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

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

class FaceBookTabBar extends Component {
	tabIcons : [];
	propTypes: {
	  goToPage: React.PropTypes.func,
	  activeTab: React.PropTypes.number,
	  tabs: React.PropTypes.array,
	}

	componentDidMount() {
		setTimeout(()=>this.props.goToPage(0), 0);
		//this._listener = this.props.scrollValue.addListener(this.setAnimatedValue);
	}

	/*setAnimatedValue({value, }) {
		this.tabIcons.forEach((icon, i)=> {
			const progress = (value-i>=0 && value-i<=1)?value-i : 1;
			icon.setNativeProps({
				style: {
					color:this.iconColor(progress),
				}
			});
		});
	}*/

	iconColor(progress) {
		const red = 49 + (159 - 49) * progress;
	    const green = 149 + (159 - 149) * progress;
	    const blue = 215 + (159 - 215) * progress;
	    return `rgb(${red}, ${green}, ${blue})`;
	}

	render() {
		return <View style={[styles.tabs, this.props.style]}>
			{
				this.props.tabs.map((tab, i)=>{
					return <TouchableOpacity key={tab} onPress={()=>setTimeout(()=>this.props.goToPage(i), 0)} style={styles.tab}>
						<Icon name={tab} size={30} color={this.props.activeTab === i? 'rgb(49,149,215)' : 'rgb(159,159,159)'}
							/>
					</TouchableOpacity>
				})
			}
		</View>
	}
}	

class TwitterPost extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	isRefreshing : false,
	  };
	}

	_onRefresh() {
		this.setState({
			isRefreshing : true,
		});
		setTimeout(()=> {
			this.setState({
				isRefreshing: false
			});
		}, 1000);
	}

	render() {
		return(
			<ScrollView refreshControl={
				<RefreshControl refreshing={this.state.isRefreshing} onRefresh={()=>this._onRefresh()} tintColor="#ddd"/>
			}>
			  <Image source={require('./img/day3.png')} style={{width:Util.size.width, height:Util.size.height-110}}></Image>
			</ScrollView>
		);
	}
}

class TwitterTab extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	selectedTab : '主页',
	  	title:'主页'
	  };
	}

	changeTab(tabName) {
		this.setState({
			selectedTab: tableName
		});
	}

	_updateTitle(obj) {
		const {i} = obj;
		let title = "";
		switch(i) {
			case 0:
				title :"主页";
				break;
			case 1:
				title : "通知";
				break;
			case 2:
				title : "私信";
				break;
			case 3 : 
				title : "我";
				break;
		}

		this.setState({
			title
		});
	}

	render() {
		return(
			<View style={styles.main}>
				<View style={styles.navAndroid}>
					<View style={styles.logoContainer}>
						<Icon name="logo-twitter" color="#fff" size={27}/>
						<Text style={styles.title}>
						  {this.state.title}
						</Text>
					</View>
					<View style={styles.iconContainer}>
						<Icon name="ios-search" color="#fff" size={25} />
						<Icon name="ios-create-outline" color="#fff" size={25} />
					</View>
				</View>
				<ScrollableTabView tabBarPosition='bottom' locked={true}
		            onChangeTab={(obj) => this._updateTitle(obj)}
		            renderTabBar={() => <FaceBookTabBar />}>
		            <TwitterPost tabLabel="ios-home" />
		            <TwitterPost tabLabel="ios-notifications" />
		            <TwitterPost tabLabel="ios-mail" />
		            <TwitterPost tabLabel="ios-person" />
	          </ScrollableTabView>
			</View>
		)
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
  			<TwitterTab />
  			{entrance}
  		</View>
  	);
  	
  }
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
	},
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
    },
    navAndroid :{
    	backgroundColor:"#3195d7",
    	width:Util.size.width,
    	height:50,
    	flexDirection:"row",
    	justifyContent: 'space-between',
    	paddingLeft:20,
    	paddingTop:10,
    	paddingRight:10,
    },
    logoContainer: {
    	flexDirection:"row",
    	justifyContent: 'flex-start',
    },
    title: {
    	color:"#fff",
    	fontSize:20,
    	paddingLeft:10
    },
    iconContainer: {
    	flexDirection:"row",
    	justifyContent: 'space-between',
    	width:60
    },
    tabs: {
    height: 45,
    flexDirection: 'row',
    marginBottom: 25,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopColor: 'rgba(0,0,0,0.05)',
    backgroundColor:"#111"
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
});
