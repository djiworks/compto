import React from 'react';
import { SearchBar, Icon } from 'react-native-elements';
import { View } from 'react-native';

export default class ListSearchBar extends React.Component {
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <SearchBar
          round
          clearIcon
          placeholder='Recherchez par nom'
          containerStyle={{flex: 1}}
          onChangeText={this.props.onSearch}
        />
        <Icon
          type="font-awesome"
          name="plus"
          size={25}
          containerStyle={{width: 50, backgroundColor: '#393e42'}}
          color="#86939e"
          onPress={this.props.onPressPlus}
        />
      </View>
    );
  }
}