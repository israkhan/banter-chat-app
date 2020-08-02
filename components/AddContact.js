import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';

import { addNewContact } from '../store';
import { Colors } from '../constants';

const AddContact = (props) => {
  const [email, setEmail] = useState('');
  const [contactFirstName, setContactFirstName] = useState('');
  const [contactLastName, setContactLastName] = useState('');

  const handleAdd = () => {
    const name = `${contactFirstName} ${contactLastName}`;
    props.addNewContact({ email, name }, props.navigation);
    setEmail('');
    setContactFirstName('');
    setContactLastName('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.input}>
          <TextInput
            placeholder="First Name"
            style={styles.text}
            value={contactFirstName}
            onChangeText={(value) => setContactFirstName(value)}
          />
          <TextInput
            placeholder="Last Name"
            style={styles.text}
            value={contactLastName}
            onChangeText={(value) => setContactLastName(value)}
          />
          <TextInput
            autoCapitalize="none"
            placeholder="Email"
            style={styles.text}
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
        </View>
      </View>
      <View style={styles.buttonTextWrapper}>
        <Button title="Add Contact" style={styles.button} onPress={handleAdd} />
        <View style={styles.buttonTextWrapper}>
          <Text style={[styles.text, { color: 'red' }]}>
            {props.addContactError}
          </Text>
        </View>
      </View>
    </View>
  );
};

const mapState = (state) => ({
  user: state.user,
  addContactError: state.user.addContactError,
});

const mapDispatch = (dispatch) => ({
  addNewContact: (contact, navigation) =>
    dispatch(addNewContact(contact, navigation)),
});

export default connect(mapState, mapDispatch)(AddContact);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  form: {
    justifyContent: 'center',
    marginTop: 15,
  },
  input: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    height: 40,
  },
  button: {
    flex: 1,
    color: Colors.tintColor,
  },
  buttonTextWrapper: {
    marginTop: 15,
    alignItems: 'center',
  },
});
