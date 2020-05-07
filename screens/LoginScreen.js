import React from "react";
import { View, StyleSheet, TextInput, Button, Alert } from "react-native";

class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Password"
          secureTextEntry={true}
        />
        <Button
          style={styles.button}
          title="Login"
          onPress={() => Alert.alert("Button with adjusted color pressed")}
        />
        <Button
          style={styles.button}
          title="Sign in with Google"
          onPress={() => Alert.alert("Button with adjusted color pressed")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputBox: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    textAlign: "left",
  },
  button: {
    borderColor: "blue",
  },
});

export default LoginScreen;
