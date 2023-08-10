import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import StackNavigation from './StackNavigation';
import AuthNavigation from './AuthNavigation';
import MyDrawer from '../Screens/Dashboard/Drawer/DrawerNavigator';
import { GetUserDetails, LogoutStatus } from '../../Redux/Action/AuthAction';
import { GetWalletBalance } from '../../Redux/Action/WalletAction';
const MainNavigation = () => {
    const [newtoken, setNewToken] = useState('');
    const [newId, setnewId] = useState('');

    const dispatch = useDispatch()
    const Stack = createNativeStackNavigator();
    const userData = useSelector((state) => state?.user?.loginData)
    //console.log("userData", userData?.data?.data[0]?.token)
    useEffect(() => {
        token()
        User_ID()
    }, [userData])
    const token = async () => {
        let data = await AsyncStorage.getItem("UserToken");
        console.log("data>>>>>>?", data)
        setNewToken(data)
    }
    const User_ID = async () => {
        let data = await AsyncStorage.getItem("UserId");
        console.log("data>>>>>>?", data)
        setnewId(data)
    }
    useEffect(() => {
        if (newId != undefined) {
            dispatch(GetUserDetails({ id: newId }))
            dispatch(GetWalletBalance({ user_id: newId }))
        }
        if (newtoken == undefined || '' || null) {
            dispatch(LogoutStatus(true))
        }
        else{
            dispatch(LogoutStatus(false))

        }
    }, [newId,newtoken])
    return (

        <View style={{ flex: 1 }}>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                {
                    newtoken ?
                        <>
                            <Stack.Screen name='MyDrawer' component={MyDrawer} />
                        </>
                        :
                        <>
                            <Stack.Screen name='AuthNavigation' component={AuthNavigation} />
                        </>
                }

            </Stack.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({});

export default MainNavigation;
