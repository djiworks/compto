import React from 'react';
import { Button, Icon } from 'react-native-elements';
import { View, Modal, TextInput, AsyncStorage } from 'react-native';

export default class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: 0,
      saving: false,
    };
    this.handleSave = this.handleSave.bind(this);
    this.saveKey = this.saveKey.bind(this);
  }

  handleSave() {
    if (this.state.name === '' || this.state.price === '') return;
    const wPrice = parseFloat(this.state.price);
    if (wPrice === NaN) return;
    this.saveKey(this.state.name, wPrice);
  }

  async saveKey(name, price) {
    this.setState({saving: true});
    const objKey = `@objects:${this.state.name}`;
    const obj = {
      name: this.state.name,
      price: parseFloat(this.state.price),
    };
    try {
      await AsyncStorage.setItem(objKey, JSON.stringify(obj));
      this.props.onClose();
    } catch (error) {
      console.log("Error saving data" + error);
    }
    this.setState({saving: false});
  }

  render() {
    let saveBtn;
    if(this.state.saving) {
      saveBtn = (
        <Button
          onPress={this.handleSave}
          title="Ajouter"
          buttonStyle={{backgroundColor: "goldenrod"}}
          loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
          loading
          disabled
        />
      );
    } else {
      saveBtn = (
        <Button
          onPress={this.handleSave}
          title="Ajouter"
          buttonStyle={{backgroundColor: "goldenrod"}}
        />
      );
    }
    return (
      <Modal
        visible={this.props.modalVisible}
        animationType="fade"
        onRequestClose={this.props.onClose}
      >
        <Icon
          type="font-awesome"
          name="times"
          size={30}
          color="goldenrod"
          onPress={this.props.onClose}
          containerStyle={{alignSelf: 'flex-end', marginTop: 25, marginRight: 20}}
        />
        <View style={{ flex: 1, justifyContent: 'center', marginLeft: 20, marginRight: 20}}>
          <Icon
            type="font-awesome"
            name="archive"
            size={80}
            color="goldenrod"
            containerStyle={{marginBottom: 30}}
          />
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10}}
            placeholder="Nom de l'objet"
            editable = {true}
            maxLength = {40}
            autofocus
            onChangeText={(value) => this.setState({name: value})}
          />
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10, marginTop: 25}}
            placeholder="Prix"
            editable = {true}
            maxLength = {40}
            keyboardType='numeric'
            returnKeyType='done'
            onChangeText={(value) => this.setState({price: value})}
          />
          
        </View>
        <View style={{padding: 25, flexDirection: 'row', justifyContent: 'center'}}>
          {saveBtn}
          <Button
            onPress={this.props.onClose}
            title="Annuler"
            buttonStyle={{backgroundColor: "grey"}}
          />
        </View>
      </Modal>
    );
  }
}
