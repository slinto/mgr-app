import {
  Text,
  StyleSheet,
  ScrollView,
  TextInput
} from 'react-native';
import React, {Component} from 'react';

import Colors from '../../config/colors';


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
          placeholderTextColor={Colors.greySub}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 90,
    backgroundColor: Colors.darkMain
  },
  textInput: {
    height: 200,
    backgroundColor: Colors.darkSub,
    color: Colors.whiteMain,
    fontSize: 15,
    padding: 15
  }
});