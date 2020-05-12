import React from "react";
import BottomTabNavigator from "./BottomTabNavigator";
import LoginNavigator from "./LoginNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";

const Stack = createStackNavigator();

export function AppNavigation(props) {
  const isLoggedIn = props.auth.uid;

  return !isLoggedIn ? (
    <LoginNavigator />
  ) : (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}

const mapState = (state) => ({
  auth: state.firebase.auth,
});

export default connect(mapState)(AppNavigation);