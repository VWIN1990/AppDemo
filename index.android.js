/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
**/
'use strict';
import React, { Component } from 'react';
import { AppRegistry, View, ScrollView, StyleSheet, TouchableHighlight, Image, Text, TouchableOpacity, Navigator} from 'react-native';
import ScrollViewComp from './views/ScrollViewComp';
import ListViewComp from './views/ListViewComp';
import FontBlank from './views/FontBlank';
import TextInputComp from './views/TextInputComp';
import NavigatorComp from './views/NavigatorComp';
import Swiper from 'react-native-swiper';
import Util from './utils/util';
//import SwiperDiy from './views/SwiperDiy';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import Twitter from './views/Twitter';

class MainView extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      days:[{
        key:0,
        title:'A stopwatch',
        component:FontBlank,
        isFA:'false',
        icon:'rocket',
        size:50,
        color:'#ff856c',
        hideNav:false,
      },
      {
        key:1,
        title:'A weather app',
        component:ListViewComp,
        isFA:false,
        icon:'ios-partly-sunny',
        size:50,
        color:'#ff856c',
        hideNav:true
      }
      ,{
        key:2,
        title:"twitter",
        component: Twitter,
        isFA: false,
        icon: "logo-twitter",
        size:50,
        color:"#2aa2ef",
        hideNav: true,
      },{
        key:23,
        title:"Youtube scrollable tab",
        component: NavigatorComp,
        isFA: false,
        icon: "logo-youtube",
        size:50,
        color:"#e32524",
        hideNav: true,
      },
      {
        key:3,
        title:"cocoapods",
        component: NavigatorComp,
        isFA: true,
        icon: "contao",
        size:50,
        color:"#FF9A05",
        hideNav: false,
      },{
        key:4,
        title:"find my location",
        component: NavigatorComp,
        isFA: false,
        icon: "md-pin",
        size:50,
        color:"#00D204",
        hideNav: false,
      },{
        key:5,
        title:"Spotify",
        component: NavigatorComp,
        isFA: true,
        icon: "spotify",
        size:50,
        color:"green",
        hideNav: true,
      },{
        key:8,
        title:"Twitter Parallax View",
        component: NavigatorComp,
        isFA: true,
        icon: "twitter-square",
        size:50,
        color:"#2aa2ef",
        hideNav: true,
      },{
        key:9,
        title:"Tumblr Menu",
        component: NavigatorComp,
        isFA: false,
        icon: "logo-tumblr",
        size:50,
        color:"blue",
        hideNav: true,
      },{
        key:10,
        title:"OpenGL",
        component: NavigatorComp,
        isFA: false,
        icon: "md-contrast",
        size:50,
        color:"#2F3600",
        hideNav: false,
      }
      ]
    };
  }

  _jumpToDay(index) {
    this.props.navigator.push({
      title:this.state.days[index].title,
      index:index+1,
      display:!this.state.days[index].hideNav,
      component:this.state.days[index].component
    });
  }

  render() {

     var onThis = this;
      var boxs = this.state.days.map(function(elem, index) {
          return(
            <TouchableHighlight
              key={elem.key}
              onPress={()=>onThis._jumpToDay(index)}
              style={[styles.touchBox, index%3==2?styles.touchBox2:styles.touchBox1]}
              underlayColor='#eee'>
              <View style={styles.boxContainer}>
                <Text style={styles.boxText}>
                  Day{index+1}
                </Text>
                {elem.isFA?<IconFA size={elem.size} name={elem.icon} style={[styles.boxIcon,{color:elem.color}]}></IconFA>:
                <Icon size={elem.size} name={elem.icon} syle={[styles.boxIcon,{color:elem.color}]}></Icon>}
              </View>
            </TouchableHighlight>
          );
      });

    return(
      //<ScrollViewComp />
      //<ListViewComp />
      //<FontBlank />
      //<TextInputComp />
      //<NavigatorComp />
      //<MainView title="hello world"/>
      //<SwiperDiy />
      <View>
        <ScrollView style={styles.mainView} title={this.props.title} activeDot={<View style={{backgroundColor:'rgba(255,255,255,0.8)', width:8, height:8, borderRadius:4, marginLeft:3, marginRight:3, marginBottom:3, marginTop:3}}/>}>
          <Swiper height={150} showButton={false} autoplay={true}>
              <View style={styles.slide} >
                <Image style={styles.image} source={require('./views/img/day1.png')}></Image>
                <Text style={styles.slidText} >Day1 : Timer</Text>
              </View>
              <View style={styles.slide}>
                <Image style={styles.image} source={require('./views/img/day2.png')}></Image>
                <Text style={styles.slidText}>Day2 : Weather</Text>
              </View>
              <View style={styles.slide}>
                <Image style={styles.image} source={require('./views/img/vwin.jpg')}></Image>
                <Text style={styles.slidText}>Day3 : Vwin</Text>
              </View>
          </Swiper>
          <View style={styles.touchBoxContainer}>
            {boxs}
          </View>
        </ScrollView>
      </View>
    );
  }

} 

class NavigatorBar extends Navigator.NavigationBar {
  render() {
    var routes = this.props.navState.routeStack;
    if (routes.length) {
      var route = routes[routes.length-1];

      if (route.display === false) {
        return null;
      }
    }
    return super.render();
  }
}


class AppDemo extends Component {
  componentDidMount() {

  }

  configScene(route, routeStack) {
    if (route.type=-'Bottom') {
      return Navigator.SceneConfigs.FloatFromBottom;
    }
    return Navigator.SceneConfigs.PushFromRight;
    
  }

  routeMapper = {
    LeftButton: (route, navigator, index, navState) => {
      if (route.index>0) {
        return <TouchableOpacity underlayColor='transparet'
                inPress={()=>{
                  if (index>0) {
                    navigator.pop()
                  }
                }}>
                <Text style={styles.navBackBtn}>
                  <Icon size={18} name="ios-arrow-back"></Icon> back
                </Text>
              </TouchableOpacity>
      } else {
        return null;
      }
    },
    RightButton:(route, navigator, index, navState)=>{
      return null;
    },
    Title:(route, navigator, index, navState)=> {
      return (<Text style={styles.navTitle}>
        {route.title}
      </Text>);
    },
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: '30 Days of RN', index: 0, display:true, component:MainView}}
        cofigureScene={this.configScene}
        renderScene={(route, navigator) => {
          return <route.component navigator={navigator} title={route.title} index={route.index} />
        }}
        navigatorBar={
          <NavigatorBar routeMapper = {this.routeMapper} styles={styles.navBar} />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    marginTop : 1,
  },
  slide: {
    flex:1,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideText : {
    position: "absolute",
    bottom:0,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:"rgba(255,255,255,0.5)",
    width:Util.size.width,
    textAlign:'center',
    fontSize:12
  },
  image: {
    width:Util.size.width,
    height:80,
    flex: 1,
    alignSelf:'stretch',
    resizeMode:'cover'
  },
  touchBox: {
    width: Util.size.width/3-0.5,
    height:Util.size.width/3,
    backgroundColor:"#fff",
  },
  touchBox1:{
    borderBottomWidth: Util.pixel,
    borderBottomColor:"#ccc",
    borderRightWidth: Util.pixel,
    borderRightColor:"#ccc",
  },
  touchBox2:{
    borderBottomWidth: Util.pixel,
    borderBottomColor:"#ccc",
    borderLeftWidth: Util.pixel,
    borderLeftColor:"#ccc",
  },
  boxContainer:{
    alignItems:"center",
    justifyContent:"center",
    width: Util.size.width/3,
    height:Util.size.width/3,
  },
  boxText:{
    position:"absolute",
    bottom:15,
    width:Util.size.width/3,
    textAlign:"center",
    left: 0,
    backgroundColor:"transparent"
  },
  touchBoxContainer:{
    flexDirection: "row", 
    flexWrap:"wrap",
    width: Util.size.width,
    borderTopWidth: Util.pixel,
    borderTopColor:"#ccc",
    borderLeftWidth: Util.pixel,
    borderLeftColor:"#ccc",
    borderRightWidth: Util.pixel,
    borderRightColor:"#ccc",
  },
   boxIon:{
    position:"relative",
    top:-10
  },
  navBackBtn: {
    paddingTop: 10,
    paddingLeft: 10,
    fontSize: 18,
    color: "#555",
  },
  navBar: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  }
});


AppRegistry.registerComponent('AppDemo', () => AppDemo);