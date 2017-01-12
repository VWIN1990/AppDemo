
import React, { Component } from 'react';
import { ScrollView, Image,  Text, View } from 'react-native';


export default class ScrollViewComp extends Component {
  render() {
    return(
      <ScrollView>
        <Text style={{fontSize:26}}>Scroll me plz</Text>
        <Image style={{width:100, height:100}} source={require('./img/vwin.jpg')}/>
        <Image style={{width:100, height:100}} source={require('./img/vwin.jpg')}/>
        <Image style={{width:100, height:100}} source={require('./img/vwin.jpg')}/>
        <Image style={{width:100, height:100}} source={require('./img/vwin.jpg')}/>
        <Image style={{width:100, height:100}} source={require('./img/vwin.jpg')}/>
        <Text style={{fontSize:26}}>Scroll me plz</Text>
        <Image style={{width:100, height:100}} source={require('./img/vwin.jpg')}/>
        <Image style={{width:100, height:100}} source={require('./img/vwin.jpg')}/>
        <Image style={{width:100, height:100}} source={require('./img/vwin.jpg')}/>
        <Image style={{width:100, height:100}} source={require('./img/vwin.jpg')}/>
        <Image style={{width:100, height:100}} source={require('./img/vwin.jpg')}/>
      </ScrollView>
    );
  }
}

