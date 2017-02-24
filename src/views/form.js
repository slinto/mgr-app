import {
  Text,
  StyleSheet,
  ScrollView,
  TextInput
} from 'react-native';
import React, {Component} from 'react';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render() {
    return(
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.textInput}
          multiline={true}
          editable={true}
          placeholder={this.props.msg}
          placeholderTextColor='#a7a5b0'
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 90,
    backgroundColor: '#070709'
  },
  textInput: {
    height: 200,
    backgroundColor: '#15141a',
    color: '#fff',
    fontSize: 15,
    padding: 15
  }
});