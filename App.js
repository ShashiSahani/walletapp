import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./src/Component/Navigation/MainNavigation";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./src/Redux/store"
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fragment, useEffect, useState } from 'react';
import { getUserData, removeToken } from './src/Component/utils/ValidationSchema';
import { loginClick } from './src/Redux/Action/AuthAction';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


export default function App() {
  useEffect(() => {
    (async () => {
      const userData = await getUserData()
      const removeData=await removeToken()

      console.log("user data App.js", userData)
      if (!!userData) {
        loginClick(userData);
      } else {
        removeData();
      }
    })();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <View style={styles.container}>
          <MainNavigation />
        </View>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
