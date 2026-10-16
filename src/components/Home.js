import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

export default class Home extends React.Component {
  state = {
    name: '',
  };

  handleNext = () => {
    const name = this.state.name.trim();
    if (!name) {
      return;
    }
    Actions.chat({ name });
  };

  render() {
    const trimmedName = this.state.name.trim();
    const canContinue = trimmedName.length > 0;

    return (
      <View style={styles.container}>
        <Text style={[styles.label, {marginTop: 40}]}>
          Enter your name :
        </Text>
        <TextInput
          placeholder='John Smith'
          style={styles.textInput}
          autoCapitalize='words'
          autoCorrect={false}
          maxLength={64}
          returnKeyType='done'
          onSubmitEditing={this.handleNext}
          onChangeText={(text) => {
            this.setState({ name: text });
          }}
          value={this.state.name}
        />
        <TouchableOpacity
          disabled={!canContinue}
          onPress={this.handleNext}
          style={!canContinue ? styles.buttonDisabled : null}
        >
          <Text style={[styles.label, !canContinue && styles.labelDisabled]}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 20,
    marginLeft: 15,
  },
  labelDisabled: {
    opacity: 0.4,
  },
  textInput: {
    height: 40,
    marginLeft: 15,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
