import React, { Component } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';

import { signUpWithEP } from '../store/auth';
import { registerForPushNotificationsAsync } from '../store/user';
import languages from '../languages.json';
import { Colors } from '../constants';

let languageArr = Object.keys(languages)
  .filter((k) => k !== 'auto')
  .map(function (key) {
    return { label: languages[key], value: languages[key] };
  });

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      language: '',
      loading: false,
      value: '',
    };
    this.inputRefs = {};

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange(evt) {
    this.setState({ email: evt.target.value });
  }

  handlePasswordChange(evt) {
    this.setState({ password: evt.target.value });
  }

  render() {
    const { email, password, firstName, lastName, language, loading } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.image}>
          <Image
            source={require('../assets/images/login_logo.png')}
            resizeMode="center"
          />
        </View>
        <TextInput
          style={styles.firstName}
          type="First Name"
          value={firstName}
          placeholder="First Name"
          onChangeText={(firstName) => this.setState({ firstName })}
          autoCorrect={false}
        />

        <TextInput
          style={styles.inputBox}
          type="Last Name"
          value={lastName}
          placeholder="Last Name"
          onChangeText={(lastName) => this.setState({ lastName })}
          autoCorrect={false}
        />

        <RNPickerSelect
          placeholder={{ label: 'Select language...', value: null }}
          placeholderTextColor="black"
          items={languageArr}
          onValueChange={(value) => {
            this.setState({
              language: value,
            });
          }}
          onUpArrow={() => {
            this.inputRefs.name.focus();
          }}
          onDownArrow={() => {
            this.inputRefs.picker2.togglePicker();
          }}
          style={{ ...pickerSelectStyles }}
          value={this.state.language}
          ref={(el) => {
            this.inputRefs.picker = el;
          }}
          hideIcon={true}
        />
        <TextInput
          style={styles.firstName}
          type="email"
          value={email}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(email) => this.setState({ email })}
          autoCorrect={false}
        />
        <TextInput
          style={styles.inputBox}
          type="password"
          value={password}
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(password) => this.setState({ password })}
          autoCorrect={false}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.signup(
              email,
              password,
              firstName,
              lastName,
              language,
              loading
            );
            // this.props.requestPushNotification();
          }}
        >
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('LoginScreen')}
        >
          <Text style={styles.buttonText}>Login with existing account</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const { width: WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#3c8cfc',
    backgroundColor: Colors.tintColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: Colors.medGray,
    borderWidth: 1,
    textAlign: 'left',
    backgroundColor: 'white',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 0.5,
    // borderColor: '#3c8cfc',
    borderColor: Colors.tintColor,
    height: 50,
    width: 220,
    borderRadius: 5,
    marginTop: 20,
    justifyContent: 'center',
  },
  buttonText: {
    // color: '#3c8cfc',
    color: Colors.tintColor,
    fontSize: 16,
    textAlign: 'center',
  },
  firstName: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: Colors.medGray,
    borderWidth: 1,
    textAlign: 'left',
    marginBottom: 0,
    backgroundColor: 'white',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: '85%',
    height: 50,
    alignSelf: 'center',
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 15,
    paddingBottom: 12,
    borderColor: Colors.medGray,
    borderWidth: 1,
    backgroundColor: 'white',
    color: 'black',
  },
});

const mapState = (state) => ({
  user: state.user,
});

const mapDispatch = (dispatch) => ({
  signup: (email, password, firstName, lastName, language) =>
    dispatch(signUpWithEP(email, password, firstName, lastName, language)),
  requestPushNotification: () => dispatch(registerForPushNotificationsAsync()),
});

export default connect(mapState, mapDispatch)(SignUpScreen);
