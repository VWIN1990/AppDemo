import React, {Component} from 'react';
import {ListView, Text, View} from 'react-native';

export default class ListViewComp extends Component {
	// init data
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2});
		this.state = {
			dataSource : ds.cloneWithRows(
				['John', 'Joel', 'Jimmy', 'Jackson', 'Vwin', 'Vwin', 'Julie', 'Devin', 'Joel', 'Jimmy', 'Jackson', 'Vwin', 'Vwin', 'Julie', 'Devin', 'Joel', 'Jimmy', 'Jackson', 'Vwin', 'Vwin', 'Julie', 'Devin', 'Joel', 'Jimmy', 'Jackson', 'Vwin', 'Vwin', 'Julie', 'Devin']
			)
		};
	}

	render() {
		return(
			<View style={{flex:1, paddingTop:22}}> 
				<ListView dataSource={this.state.dataSource}
						  renderRow={(rowData) => <Text>{rowData}</Text>}
				/>
			</View>

		);
	}
}	
