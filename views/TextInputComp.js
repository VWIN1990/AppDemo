import React, {Component} from 'react';
import {TextInput, Text, View} from 'react-native';

export default class TextInputComp extends Component {
	constructor(props) {
	    super(props);
	    this.state = {text:''};
	  }

  render() {
    return(
      <View style={{padding:10}}>
        <TextInput style={{height:40}}
          placeholder="type here your msg"
          onChangeText={(text)=>this.setState({text})} />
         <Text sytle={{padding:10,  fontsize:42}}>
          {this.state.text.split(' ').map((word)=>word && 'FOOD').join(' ')}
         </Text>
      </View>
    );
  }
}

