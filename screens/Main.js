import React from 'react';
import { FlatList, View, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';

import ListRowItem from '../components/ListRowItem';
import ListSearchBar from '../components/ListSearchBar';
import AddModal from '../components/AddModal';


export default class MainScreen extends React.Component {
  static navigationOptions = () => {
    return {
      header: null,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      loading: false,
      items: [],
    };

    this.renderFooter = this.renderFooter.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.handlePlus = this.handlePlus.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handlePlus() {
   //TODO
  }

  handleSearch(text) {
    this.setState({ search: text });
  }

  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  renderHeader() {
    return (
      <ListSearchBar
        onPressPlus={this.openModal}
        onSearch={this.handleSearch}
      />
    );
  }

  renderFooter() {
    if (this.state.items.length === 0 && !this.state.loading) return (
      <Text>Vous n'avez pas d'objets enregistrés...</Text>
    );

    return (
      <View style={{ flex: 1, paddingTop: 15, alignItems: 'center' }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  renderItem({ item }) {
    return (
      <ListRowItem 
        item={item}
        onPressRightIcon={() => console.log('toto')}
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1, marginTop: 24, backgroundColor: 'white' }}>
        <FlatList
          data={this.state.items}
          keyExtractor={item => item.id}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          renderItem={this.renderItem}
          refreshing={this.state.loading}
        />
        <AddModal
          modalVisible={this.state.modalVisible}
          onClose={this.closeModal}
        />
      </View>
    );
  }
}
