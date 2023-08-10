import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Text,
    TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { String } from "../../utils/String";
import { colors } from "../../utils/colors";
import { Divider } from "react-native-paper";
import { WithDrawRequest } from "../../../Redux/Action/WalletAction";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ChangePassword } from "../../../Redux/Action/AuthAction";


const ForgotPassword = ({ navigation }) => {
    const [bankError, setBankError] = useState(false);
    const [paytm_numerError, setpaytm_numerError] = useState('');
    const [PassWord, setPassword] = useState({
        NewPassWord: "",
        Confirm_password: ""
    });
    const dispatch = useDispatch()


    const [newId, setnewId] = useState('');
    const User_ID = async () => {
        let data = await AsyncStorage.getItem("UserId");
        console.log("data>>>>>>?", data)
        setnewId(data)
    }
    useEffect(() => {
        User_ID()
    }, [])
    const onSubmit = () => {
        if (PassWord.NewPassWord == "") {
            setBankError(" Password  is Required!!");
        }
        if (PassWord.Confirm_password == "") {
            setpaytm_numerError(" confirmation password is required");
        }
        else {

            const payload = {
                id: newId,
                password: PassWord.NewPassWord,
                confirm_password: PassWord.Confirm_password,
            }
            dispatch(ChangePassword(payload))
        }
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#3498db" }}>
            <StatusBar animated={true} backgroundColor="red" />

            <View
                style={{
                    //   backgroundColor: "#01b0ff",
                    backgroundColor: colors.black,
                    height: "100%",
                    borderWidth: 1,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    top: 40,
                }}
            >
                <ScrollView
                    style={{
                        backgroundColor: colors.black,
                        height: "100%",
                        top: -30,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        position: "absolute",
                        width: "100%",
                    }}
                >
                    <View
                        style={{
                            width: 50,
                            height: 70,
                            justifyContent: "center",
                            alignItems: "center",
                            alignSelf: "flex-end",
                            right: 10,
                        }}
                    >
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <AntDesign name="closecircleo" size={34} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 20,
                        }}
                    >
                        <Text
                            style={{
                                color: colors.white,
                                fontSize: 18,
                                fontWeight: 600,
                            }}
                        >
                            {String.Enter_bank_password}
                        </Text>
                    </View>
                    <Divider />

                    <View style={styles.viewStyle}>
                        <Text style={styles.textStyle}>{String.Password}</Text>

                        <TextInput
                            style={styles.TextInputStyle}
                            value={PassWord.NewPassWord}
                            onChangeText={(text) => {
                                setPassword(
                                    { ...PassWord, NewPassWord: text },
                                    setPassword("")
                                );
                            }}
                        />
                        <Text style={styles.errorStyle}>{bankError}</Text>
                    </View>
                    <View style={styles.viewStyle}>
                        <Text style={styles.textStyle}>{String.Confirm_password}</Text>

                        <TextInput style={styles.TextInputStyle}
                            value={PassWord.Confirm_password}
                            onChangeText={(text) => {
                                setPassword(
                                    { ...PassWord, Confirm_password: text },
                                    setPassword("")
                                );
                            }}

                        />
                        <Text style={styles.errorStyle}>{paytm_numerError}</Text>
                    </View>

                    <View style={styles.buttonView}>
                        <TouchableOpacity
                            style={styles.buttonTouchable}
                            onPress={() => {
                                onSubmit();
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 19,
                                    fontWeight: "bold",
                                    color: colors.black,
                                }}
                            >
                                {String.Submit}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    viewStyle: {
        justifyContent: "center",
        left: 20,
        top: 10,
    },
    textStyle: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 300,
        top: 10,
    },
    TextInputStyle: {
        height: 30,
        margin: 12,
        borderWidth: 1,
        padding: 5,
        right: 15,
        borderColor: colors.black,
        width: "90%",
        borderRadius: 5,
        color: colors.white,
        borderBottomColor: colors.white,
    },
    buttonView: {
        justifyContent: "center",
        alignItems: "center",
        margin: 30,
        shadowColor: "white",
        shadowOpacity: 0.2,
        elevation: 5,
        backgroundColor: "#0000",
        shadowRadius: 5,
        shadowOffset: { width: 5, height: 5 },
        borderWidth: 0,
        borderRadius: 0,
    },
    buttonTouchable: {
        height: 50,
        width: "50%",
        borderColor: colors.aqua,
        borderWidth: 5,
        backgroundColor: colors.aqua,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    errorStyle: {
        color: "red",
    },
});

export default ForgotPassword;
