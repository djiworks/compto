import React, { Component } from 'react';
import { ListItem, Avatar, Text, Icon } from 'react-native-elements';
import { View } from 'react-native';

export default class ListRowItem extends Component {
  renderSubtitle(count, price) {
    return (
      <View style={{ paddingLeft: 10 }}>
        <View>
          <Rating
            showRating
            type="rocket"
            fractions={1}
            startingValue={(price / count) * 10 / price}
            readonly
            ratingCount={10}
            style={{ paddingVertical: 10 }}
          />
        </View>
        <View style={{paddingTop: 5, flexDirection: 'row', alignItems: 'center'}} >
          <Icon
            type='entypo'
            name='price-tag'
            size={15}
            color='goldenrod'
          />
          <Text style={{marginLeft: 5, marginRight:10, fontSize: 15, color: 'goldenrod'}}>{price}</Text>
          <Icon
            type='entypo'
            name='hand'
            size={12}
            color='goldenrod'
          />
          <Text style={{marginLeft: 5, fontSize: 15, color: 'goldenrod'}}>{count}</Text>
        </View>
      </View>
    );
  }
  render() {
    const { name, count, price } = this.props.item;
    return (
      <ListItem
        title={name}
        titleStyle={{ fontWeight: 'bold' }}
        subtitle={this.renderSubtitle(count, price)}
        avatar={
          <Avatar
            large
            source={{uri: 'http://via.placeholder.com/100x100'}}
          />
        }
        onPress={this.props.onPress}
      />
    );
  }
}
